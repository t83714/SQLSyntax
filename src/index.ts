export type Value =
    | string
    | number
    | boolean
    | Date
    | null
    | undefined
    | Value[]
    | { [key: string]: Value };

export type RawValue = Value | SQLSyntax;

/**
 * An class represents a SQL query piece / fragment.
 * The provided `sqls` tagged template literals will output an instance of SQLSyntax class.
 * All properties of SQLSyntax are readonly. Thus is immutable.
 * An instance of SQLSyntax class will record
 *
 * @class SQLSyntax
 */
export class SQLSyntax {
    private readonly rawSqlParts?: TemplateStringsArray;
    private readonly rawValues?: RawValue[];

    // when `isEmpty`, the object represent an empty SQL query piece / fragment
    readonly isEmpty: boolean;

    readonly values: Value[] = [];
    readonly sqlParts: string[] = [];

    constructor(
        isEmpty: boolean,
        rawSqlParts?: TemplateStringsArray,
        rawValues?: RawValue[],
        sqlParts?: string[],
        values?: Value[]
    ) {
        this.isEmpty = isEmpty ? true : false;

        if (this.isEmpty) {
            this.isEmpty = true;
            return;
        }

        if (!rawSqlParts?.length && !sqlParts?.length) {
            throw new Error(
                "SQLSyntax: `rawSqlParts` & `sqlParts` can't be both empty for a non-empty SQLSyntax."
            );
        }

        if (!rawSqlParts?.length) {
            // allow to set this.sqlParts & this.values directly.
            // an interface for SQLSyntax.createUnsafely
            this.sqlParts.push(...sqlParts);
            if (values?.length) {
                this.values.push(...values);
            }
            return;
        }

        this.rawSqlParts = rawSqlParts;
        this.rawValues = rawValues;

        // in case it was called with empty value (e.g. undefined ) `rawValues` parameter
        rawValues = rawValues?.length ? rawValues : [];

        if (rawSqlParts.length !== rawValues.length + 1) {
            throw new Error(
                "SQLSyntax: `rawSqlParts.length` should be equal to `rawValues.length` + 1."
            );
        }

        // if (rawSqlParts.length === 1) {
        //     this.sqlParts.push(rawSqlParts[0]);
        //     return;
        // }

        rawSqlParts.forEach((part, idx) => {
            if (idx === 0) {
                this.sqlParts.push(part);
            } else {
                const previousValue = rawValues?.[idx - 1];
                if (previousValue instanceof SQLSyntax) {
                    this.sqlParts[this.sqlParts.length - 1] += part;
                } else {
                    this.sqlParts.push(part);
                }
            }
            if (idx < rawValues.length) {
                const currentVal = rawValues[idx];
                if (currentVal instanceof SQLSyntax) {
                    if (!currentVal.isEmpty) {
                        this.sqlParts[this.sqlParts.length - 1] +=
                            currentVal.sqlParts[0];
                        this.values.push(...currentVal.values);
                        this.sqlParts.push(...currentVal.sqlParts.slice(1));
                    }
                } else {
                    this.values.push(currentVal);
                }
            }
        });
    }

    toQuery(): [string, Value[]] {
        if (this.isEmpty) {
            return ["", []];
        }
        const finalParts: string[] = [];
        this.values.forEach((value, idx) => {
            finalParts.push(this.sqlParts[idx], `$${idx + 1}`);
        });
        if (this.sqlParts.length > this.values.length) {
            finalParts.push(
                ...this.sqlParts.slice(this.values.length, this.sqlParts.length)
            );
        }

        return [finalParts.join(""), this.values];
    }

    append(syntax: SQLSyntax) {
        return sqls`${this} ${syntax}`;
    }

    groupBy(...columns: SQLSyntax[]) {
        columns = SQLSyntax.filterEmpty(columns);
        if (!columns?.length) {
            return this;
        } else {
            return sqls`${this} GROUP BY ${SQLSyntax.csv(...columns)}`;
        }
    }

    having(condition: SQLSyntax) {
        return sqls`${this} HAVING ${condition}`;
    }

    orderBy(...columns: SQLSyntax[]) {
        columns = SQLSyntax.filterEmpty(columns);
        if (!columns?.length) {
            return this;
        } else {
            return sqls`${this} ORDER BY ${SQLSyntax.csv(...columns)}`;
        }
    }

    asc() {
        return sqls`${this} ASC`;
    }

    desc() {
        return sqls`${this} DESC`;
    }

    limit(n: number) {
        return sqls`${this} LIMIT ${n}`;
    }

    offset(n: number) {
        return sqls`${this} OFFSET ${n}`;
    }

    where(conditions?: SQLSyntax) {
        if (!conditions || conditions.isEmpty) {
            return this;
        }
        return sqls`${this} WHERE ${conditions}`;
    }

    and(condition?: SQLSyntax) {
        if (!condition || condition.isEmpty) {
            return this;
        }
        return sqls`${this} AND ${condition}`;
    }

    or(condition?: SQLSyntax) {
        if (!condition || condition.isEmpty) {
            return this;
        }
        return sqls`${this} OR ${condition}`;
    }

    roundBracket() {
        if (this.isEmpty) {
            return this;
        }
        return sqls`(${this})`;
    }

    eq(value: Value) {
        if (typeof value === "undefined" || value == null) {
            return sqls`${this} IS NULL`;
        } else {
            return sqls`${this} = ${value}`;
        }
    }

    gt(value: Value) {
        return sqls`${this} > ${value}`;
    }

    ge(value: Value) {
        return sqls`${this} >= ${value}`;
    }

    lt(value: Value) {
        return sqls`${this} < ${value}`;
    }

    le(value: Value) {
        return sqls`${this} <= ${value}`;
    }

    isNull() {
        return sqls`${this} IS NULL`;
    }

    isNotNull() {
        return sqls`${this} IS NOT NULL`;
    }

    in(values: Value[]): SQLSyntax;
    in(subQuery: SQLSyntax): SQLSyntax;
    in(valueOrSubQuery: Value[] | SQLSyntax): SQLSyntax {
        if (valueOrSubQuery instanceof SQLSyntax) {
            if (valueOrSubQuery.isEmpty) {
                throw new Error("empty SQLSyntax is not allowed for `in`.");
            } else {
                return sqls`${this} IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                throw new Error("empty value list is not allowed for `in`.");
            } else {
                return sqls`${this} IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map((v: any) => sqls`${v}`)
                ).roundBracket()}`;
            }
        }
    }

    notIn(values: Value[]): SQLSyntax;
    notIn(subQuery: SQLSyntax): SQLSyntax;
    notIn(valueOrSubQuery: Value[] | SQLSyntax): SQLSyntax {
        if (valueOrSubQuery instanceof SQLSyntax) {
            if (valueOrSubQuery.isEmpty) {
                throw new Error("empty SQLSyntax is not allowed for `notIn`.");
            } else {
                return sqls`${this} NOT IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                throw new Error("empty SQLSyntax is not allowed for `notIn`.");
            } else {
                return sqls`${this} NOT IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map((v: any) => sqls`${v}`)
                ).roundBracket()}`;
            }
        }
    }

    like(value: String) {
        return sqls`${this} LIKE ${value}`;
    }

    notLike(value: String) {
        return sqls`${this} NOT LIKE ${value}`;
    }

    exists(part?: SQLSyntax) {
        if (!part || !part.isEmpty) {
            return SQLSyntax.empty;
        }
        return sqls`${this} EXISTS ${part}`;
    }

    notExists(part: SQLSyntax) {
        if (!part || !part.isEmpty) {
            return SQLSyntax.empty;
        }
        return sqls`${this} NOT EXISTS ${part}`;
    }

    static empty = new SQLSyntax(true);

    /**
     * Allow create an instance of SQLSyntax from a string variable `sqlStr`.
     * The content of the string variable `sqlStr` will become the SQL query string without any escaping.
     * You might need this method to create indentifier (e.g. tbale or column names) as SQLSyntax.
     * Make sure you process the string input well to avoid SQL injection vulnerability.
     *
     * @static
     * @param {string} sqlStr
     * @param {any[]} [params=[]]
     * @return {SQLSyntax}
     * @memberof SQLSyntax
     */
    static createUnsafely(sqlStr: string, params: any[] = []): SQLSyntax {
        return new SQLSyntax(false, undefined, undefined, [sqlStr], params);
    }

    static filterEmpty(parts: SQLSyntax[]) {
        if (parts?.length) {
            return [];
        }
        return parts.filter((item) => item && !item.isEmpty);
    }

    static join(
        parts: SQLSyntax[],
        delimiter: SQLSyntax,
        spaceBeforeDelimier: boolean = true
    ) {
        parts = SQLSyntax.filterEmpty(parts);
        if (!parts?.length) {
            return SQLSyntax.empty;
        }
        const sep = spaceBeforeDelimier ? sqls` ${delimiter}` : delimiter;
        let result: SQLSyntax = parts[0];
        if (parts.length > 1) {
            for (let i = 1; i < parts.length; i++) {
                result = sqls`${result}${sep}${parts[i]}`;
            }
        }
        return result;
    }

    static csv(...parts: SQLSyntax[]) {
        parts = SQLSyntax.filterEmpty(parts);
        if (!parts?.length) {
            return SQLSyntax.empty;
        }
        return SQLSyntax.join(parts, sqls`,`, false);
    }

    static hasAndOr(s: SQLSyntax): boolean {
        let [sqlStr] = s.toQuery();
        sqlStr = sqlStr.toLowerCase();
        if (sqlStr.indexOf(" and ") == -1 && sqlStr.indexOf(" or ") == -1) {
            return false;
        } else {
            return true;
        }
    }

    static joinWithAnd(conditions: SQLSyntax[]) {
        conditions = SQLSyntax.filterEmpty(conditions);
        if (!conditions?.length) {
            return SQLSyntax.empty;
        }
        return SQLSyntax.join(
            conditions
                .filter((s) => s && !s.isEmpty)
                .map((s) => (SQLSyntax.hasAndOr(s) ? s.roundBracket() : s)),
            sqls` AND `,
            false
        );
    }

    static joinWithOr(conditions: SQLSyntax[]) {
        conditions = SQLSyntax.filterEmpty(conditions);
        if (!conditions?.length) {
            return SQLSyntax.empty;
        }
        return SQLSyntax.join(
            conditions
                .filter((s) => s && !s.isEmpty)
                .map((s) => (SQLSyntax.hasAndOr(s) ? s.roundBracket() : s)),
            sqls` OR `,
            false
        );
    }

    static groupBy(...columns: SQLSyntax[]) {
        return SQLSyntax.empty.groupBy(...columns);
    }

    static having(condition: SQLSyntax) {
        return SQLSyntax.empty.having(condition);
    }

    static orderBy(...columns: SQLSyntax[]) {
        return SQLSyntax.empty.orderBy(...columns);
    }

    static asc = SQLSyntax.empty.asc();
    static desc = SQLSyntax.empty.desc();

    static limit(n: number) {
        return SQLSyntax.empty.limit(n);
    }

    static offset(n: number) {
        return SQLSyntax.empty.offset(n);
    }

    static where(condition?: SQLSyntax) {
        return SQLSyntax.empty.where(condition);
    }

    static eq(column: SQLSyntax, value: Value) {
        if (typeof value === "undefined" || value == null) {
            return sqls`${column} IS NULL`;
        } else {
            return sqls`${column} = ${value}`;
        }
    }

    static gt(column: SQLSyntax, value: Value) {
        return sqls`${column} > ${value}`;
    }

    static ge(column: SQLSyntax, value: Value) {
        return sqls`${column} >= ${value}`;
    }

    static lt(column: SQLSyntax, value: Value) {
        return sqls`${column} < ${value}`;
    }

    static le(column: SQLSyntax, value: Value) {
        return sqls`${column} <= ${value}`;
    }

    static isNull(column: SQLSyntax) {
        return sqls`${column} IS NULL`;
    }

    static isNotNull(column: SQLSyntax) {
        return sqls`${column} IS NOT NULL`;
    }

    static in(column: SQLSyntax, values: Value[]): SQLSyntax;
    static in(column: SQLSyntax, subQuery: SQLSyntax): SQLSyntax;
    static in(
        column: SQLSyntax,
        valueOrSubQuery: Value[] | SQLSyntax
    ): SQLSyntax {
        if (valueOrSubQuery instanceof SQLSyntax) {
            if (valueOrSubQuery.isEmpty) {
                return sqls`FALSE`;
            } else {
                return sqls`${column} IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                return sqls`FALSE`;
            } else {
                return sqls`${column} IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map((v: any) => sqls`${v}`)
                ).roundBracket()}`;
            }
        }
    }

    static notIn(column: SQLSyntax, values: Value[]): SQLSyntax;
    static notIn(column: SQLSyntax, subQuery: SQLSyntax): SQLSyntax;
    static notIn(
        column: SQLSyntax,
        valueOrSubQuery: Value[] | SQLSyntax
    ): SQLSyntax {
        if (valueOrSubQuery instanceof SQLSyntax) {
            if (valueOrSubQuery.isEmpty) {
                return sqls`TRUE`;
            } else {
                return sqls`${column} NOT IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                return sqls`TRUE`;
            } else {
                return sqls`${column} NOT IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map((v: any) => sqls`${v}`)
                ).roundBracket()}`;
            }
        }
    }

    static like(column: SQLSyntax, value: String) {
        return sqls`${column} LIKE ${value}`;
    }

    static notLike(column: SQLSyntax, value: String) {
        return sqls`${column} NOT LIKE ${value}`;
    }

    static exists(part: SQLSyntax) {
        return SQLSyntax.empty.exists(part);
    }

    static notExists(part: SQLSyntax) {
        return SQLSyntax.empty.notExists(part);
    }

    static distinct(...columns: SQLSyntax[]) {
        return sqls`DISTINCT ${SQLSyntax.csv(...columns)}`;
    }

    static count(column: SQLSyntax) {
        return sqls`COUNT(${column})`;
    }

    static min(column: SQLSyntax) {
        return sqls`MIN(${column})`;
    }

    static max(column: SQLSyntax) {
        return sqls`MAX(${column})`;
    }

    static avg(column: SQLSyntax) {
        return sqls`AVG(${column})`;
    }

    static sum(column: SQLSyntax) {
        return sqls`SUM(${column})`;
    }

    static roundBracket(inner?: SQLSyntax) {
        if (!inner || !inner?.isEmpty) {
            return SQLSyntax.empty;
        }
        return inner.roundBracket();
    }
}

export const sqls = (sqlParts: TemplateStringsArray, ...values: any[]) => {
    if (sqlParts.length === 1 && sqlParts[0] === "") {
        return SQLSyntax.empty;
    }
    return new SQLSyntax(false, sqlParts, values);
};

export default SQLSyntax;
