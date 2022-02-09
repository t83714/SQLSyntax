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
    public readonly isEmpty: boolean;

    public readonly values: Value[] = [];
    public readonly sqlParts: string[] = [];

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
        if (SQLSyntax.customToQueryFunc) {
            return SQLSyntax.customToQueryFunc(this);
        } else {
            return SQLSyntax.defaultToQueryFunc(this);
        }
    }

    static defaultToQueryFunc(sql: SQLSyntax): [string, Value[]] {
        if (sql.isEmpty) {
            return ["", []];
        }
        const finalParts: string[] = [];
        sql.values.forEach((value, idx) => {
            finalParts.push(sql.sqlParts[idx], `$${idx + 1}`);
        });
        if (sql.sqlParts.length > sql.values.length) {
            finalParts.push(
                ...sql.sqlParts.slice(sql.values.length, sql.sqlParts.length)
            );
        }

        return [finalParts.join(""), sql.values];
    }

    public static customToQueryFunc?: (sql: SQLSyntax) => [string, Value[]];

    append(syntax: SQLSyntax) {
        return SQLSyntax.sqls`${this} ${syntax}`;
    }

    groupBy(...columns: SQLSyntax[]) {
        columns = SQLSyntax.filterEmpty(columns);
        if (!columns?.length) {
            return this;
        } else {
            return SQLSyntax.sqls`${this} GROUP BY ${SQLSyntax.csv(
                ...columns
            )}`;
        }
    }

    having(condition: SQLSyntax) {
        return SQLSyntax.sqls`${this} HAVING ${condition}`;
    }

    orderBy(...columns: SQLSyntax[]) {
        columns = SQLSyntax.filterEmpty(columns);
        if (!columns?.length) {
            return this;
        } else {
            return SQLSyntax.sqls`${this} ORDER BY ${SQLSyntax.csv(
                ...columns
            )}`;
        }
    }

    asc() {
        return SQLSyntax.sqls`${this} ASC`;
    }

    desc() {
        return SQLSyntax.sqls`${this} DESC`;
    }

    limit(n: number) {
        return SQLSyntax.sqls`${this} LIMIT ${n}`;
    }

    offset(n: number) {
        return SQLSyntax.sqls`${this} OFFSET ${n}`;
    }

    where(conditions?: SQLSyntax) {
        if (!conditions || conditions.isEmpty) {
            return this;
        }
        return SQLSyntax.sqls`${this} WHERE ${conditions}`;
    }

    and(condition?: SQLSyntax) {
        if (!condition || condition.isEmpty) {
            return this;
        }
        return SQLSyntax.sqls`${this} AND ${condition}`;
    }

    or(condition?: SQLSyntax) {
        if (!condition || condition.isEmpty) {
            return this;
        }
        return SQLSyntax.sqls`${this} OR ${condition}`;
    }

    roundBracket() {
        if (this.isEmpty) {
            return this;
        }
        return SQLSyntax.sqls`(${this})`;
    }

    eq(value: Value) {
        if (typeof value === "undefined" || value == null) {
            return SQLSyntax.sqls`${this} IS NULL`;
        } else {
            return SQLSyntax.sqls`${this} = ${value}`;
        }
    }

    gt(value: Value) {
        return SQLSyntax.sqls`${this} > ${value}`;
    }

    ge(value: Value) {
        return SQLSyntax.sqls`${this} >= ${value}`;
    }

    lt(value: Value) {
        return SQLSyntax.sqls`${this} < ${value}`;
    }

    le(value: Value) {
        return SQLSyntax.sqls`${this} <= ${value}`;
    }

    isNull() {
        return SQLSyntax.sqls`${this} IS NULL`;
    }

    isNotNull() {
        return SQLSyntax.sqls`${this} IS NOT NULL`;
    }

    in(values: Value[]): SQLSyntax;
    in(subQuery: SQLSyntax): SQLSyntax;
    in(valueOrSubQuery: Value[] | SQLSyntax): SQLSyntax {
        if (valueOrSubQuery instanceof SQLSyntax) {
            if (valueOrSubQuery.isEmpty) {
                throw new Error("empty SQLSyntax is not allowed for `in`.");
            } else {
                return SQLSyntax.sqls`${this} IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                throw new Error("empty value list is not allowed for `in`.");
            } else {
                return SQLSyntax.sqls`${this} IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map(
                        (v: RawValue) => SQLSyntax.sqls`${v}`
                    )
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
                return SQLSyntax.sqls`${this} NOT IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                throw new Error("empty SQLSyntax is not allowed for `notIn`.");
            } else {
                return SQLSyntax.sqls`${this} NOT IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map(
                        (v: RawValue) => SQLSyntax.sqls`${v}`
                    )
                ).roundBracket()}`;
            }
        }
    }

    like(value: string) {
        return SQLSyntax.sqls`${this} LIKE ${value}`;
    }

    notLike(value: string) {
        return SQLSyntax.sqls`${this} NOT LIKE ${value}`;
    }

    exists(part?: SQLSyntax) {
        if (!part || !part.isEmpty) {
            return SQLSyntax.empty;
        }
        return SQLSyntax.sqls`${this} EXISTS ${part}`;
    }

    notExists(part: SQLSyntax) {
        if (!part || !part.isEmpty) {
            return SQLSyntax.empty;
        }
        return SQLSyntax.sqls`${this} NOT EXISTS ${part}`;
    }

    public static empty = new SQLSyntax(true);

    static sqls(sqlParts: TemplateStringsArray, ...values: RawValue[]) {
        if (sqlParts.length === 1 && sqlParts[0] === "") {
            return SQLSyntax.empty;
        }
        return new SQLSyntax(false, sqlParts, values);
    }

    /**
     * Allow create an instance of SQLSyntax from a string variable `sqlStr`.
     * The content of the string variable `sqlStr` will become the SQL query string without any escaping.
     * You might need this method to create indentifier (e.g. tbale or column names) as SQLSyntax.
     * Make sure you process the string input well to avoid SQL injection vulnerability.
     *
     * @static
     * @param {string} sqlStr
     * @return {SQLSyntax}
     * @memberof SQLSyntax
     */
    static createUnsafely(sqlStr: string): SQLSyntax {
        return new SQLSyntax(false, undefined, undefined, [sqlStr]);
    }

    static filterEmpty(parts: SQLSyntax[]) {
        if (!parts?.length) {
            return [];
        }
        return parts.filter((item) => item && !item.isEmpty);
    }

    static join(
        parts: SQLSyntax[],
        delimiter: SQLSyntax,
        spaceBeforeDelimier = true
    ) {
        parts = SQLSyntax.filterEmpty(parts);
        if (!parts?.length) {
            return SQLSyntax.empty;
        }
        const sep = spaceBeforeDelimier
            ? SQLSyntax.sqls` ${delimiter}`
            : delimiter;
        let result: SQLSyntax = parts[0];
        if (parts.length > 1) {
            for (let i = 1; i < parts.length; i++) {
                result = SQLSyntax.sqls`${result}${sep}${parts[i]}`;
            }
        }
        return result;
    }

    static csv(...parts: SQLSyntax[]) {
        parts = SQLSyntax.filterEmpty(parts);
        if (!parts?.length) {
            return SQLSyntax.empty;
        }
        return SQLSyntax.join(parts, SQLSyntax.sqls`,`, false);
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
            SQLSyntax.sqls` AND `,
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
            SQLSyntax.sqls` OR `,
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

    public static asc = SQLSyntax.empty.asc();
    public static desc = SQLSyntax.empty.desc();

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
            return SQLSyntax.sqls`${column} IS NULL`;
        } else {
            return SQLSyntax.sqls`${column} = ${value}`;
        }
    }

    static gt(column: SQLSyntax, value: Value) {
        return SQLSyntax.sqls`${column} > ${value}`;
    }

    static ge(column: SQLSyntax, value: Value) {
        return SQLSyntax.sqls`${column} >= ${value}`;
    }

    static lt(column: SQLSyntax, value: Value) {
        return SQLSyntax.sqls`${column} < ${value}`;
    }

    static le(column: SQLSyntax, value: Value) {
        return SQLSyntax.sqls`${column} <= ${value}`;
    }

    static isNull(column: SQLSyntax) {
        return SQLSyntax.sqls`${column} IS NULL`;
    }

    static isNotNull(column: SQLSyntax) {
        return SQLSyntax.sqls`${column} IS NOT NULL`;
    }

    static in(column: SQLSyntax, values: Value[]): SQLSyntax;
    static in(column: SQLSyntax, subQuery: SQLSyntax): SQLSyntax;
    static in(
        column: SQLSyntax,
        valueOrSubQuery: Value[] | SQLSyntax
    ): SQLSyntax {
        if (valueOrSubQuery instanceof SQLSyntax) {
            if (valueOrSubQuery.isEmpty) {
                return SQLSyntax.sqls`FALSE`;
            } else {
                return SQLSyntax.sqls`${column} IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                return SQLSyntax.sqls`FALSE`;
            } else {
                return SQLSyntax.sqls`${column} IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map(
                        (v: RawValue) => SQLSyntax.sqls`${v}`
                    )
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
                return SQLSyntax.sqls`TRUE`;
            } else {
                return SQLSyntax.sqls`${column} NOT IN (${valueOrSubQuery})`;
            }
        } else {
            if (!valueOrSubQuery?.length) {
                return SQLSyntax.sqls`TRUE`;
            } else {
                return SQLSyntax.sqls`${column} NOT IN ${SQLSyntax.csv(
                    ...valueOrSubQuery.map(
                        (v: RawValue) => SQLSyntax.sqls`${v}`
                    )
                ).roundBracket()}`;
            }
        }
    }

    static like(column: SQLSyntax, value: string) {
        return SQLSyntax.sqls`${column} LIKE ${value}`;
    }

    static notLike(column: SQLSyntax, value: string) {
        return SQLSyntax.sqls`${column} NOT LIKE ${value}`;
    }

    static exists(part: SQLSyntax) {
        return SQLSyntax.empty.exists(part);
    }

    static notExists(part: SQLSyntax) {
        return SQLSyntax.empty.notExists(part);
    }

    static distinct(...columns: SQLSyntax[]) {
        return SQLSyntax.sqls`DISTINCT ${SQLSyntax.csv(...columns)}`;
    }

    static count(column: SQLSyntax) {
        return SQLSyntax.sqls`COUNT(${column})`;
    }

    static min(column: SQLSyntax) {
        return SQLSyntax.sqls`MIN(${column})`;
    }

    static max(column: SQLSyntax) {
        return SQLSyntax.sqls`MAX(${column})`;
    }

    static avg(column: SQLSyntax) {
        return SQLSyntax.sqls`AVG(${column})`;
    }

    static sum(column: SQLSyntax) {
        return SQLSyntax.sqls`SUM(${column})`;
    }

    static roundBracket(inner?: SQLSyntax) {
        if (!inner || !inner?.isEmpty) {
            return SQLSyntax.empty;
        }
        return inner.roundBracket();
    }
}

export function sqls(sqlParts: TemplateStringsArray, ...values: RawValue[]) {
    return SQLSyntax.sqls(sqlParts, ...values);
}

/**
 * Escape postgreSQL SQL identifier string
 * Although postgreSQL does allow non-ASCII characters in identifiers, to make it simple, we will remove any non-ASCII characters.
 *
 * @export
 * @param {string} idStr
 * @return {*}  {string}
 */
function escapeIdentifierStr(idStr: string): string {
    return '"' + idStr.replace(/[^\x20-\x7e]/g, "").replace(/"/g, "\"'") + '"';
}

/**
 * Escape postgreSQL SQL identifier (e.g. column names, or table names).
 * `xxx."ss.dd` will be escaped as `"xxx"."""ss"."dd"`
 * Although postgreSQL does allow non-ASCII characters in identifiers, to make it simple, we will remove any non-ASCII characters.
 *
 * @export
 * @param {string} id
 * @return {*}  {SQLSyntax}
 */
export function escapeIdentifier(id: string): SQLSyntax {
    const sanitisedIdStr = id.replace(/[^\x20-\x7e]/g, "");
    const parts = sanitisedIdStr.split(".");
    const escapedIdStr =
        parts.length > 1
            ? parts.map((item) => escapeIdentifierStr(item)).join(".")
            : escapeIdentifierStr(sanitisedIdStr);
    return SQLSyntax.createUnsafely(escapedIdStr);
}

/**
 * Make a postgreSQL identifier in SQLSyntax from tableRef (optional) & column name.
 *
 * @export
 * @param {String} columnName
 * @param {String} [tableRef=""]
 * @param {Boolean} [useLowerCaseColumnName=true]
 * @return {*}  {SQLSyntax}
 */
export function getTableColumnName(
    columnName: string,
    tableRef = "",
    useLowerCaseColumnName = false
): SQLSyntax {
    const id = [
        tableRef,
        useLowerCaseColumnName ? columnName.toLowerCase : useLowerCaseColumnName
    ]
        .filter((item) => item)
        .join(".");
    return escapeIdentifier(id);
}

export default SQLSyntax;
