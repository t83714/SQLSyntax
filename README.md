# SQLSyntax

![npm](https://img.shields.io/npm/v/sql-syntax?style=plastic)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/t83714/SQLSyntax/Main%20CI%20Workflow)

Tagged template literals utilities for ease of composing SQL queries. 
This is a javascript port of ScalikeJBDC's [SQLSyntax](http://scalikejdbc.org/documentation/sql-interpolation.html#sqlsyntax) class.

### API document

https://t83714.github.io/SQLSyntax/

### Example Usgae

```typescript
import SQLSyntax, {sqls} from "sql-syntax";
import { Client } = "pg";

const client = new Client();
await client.connect();

const userId = "my-id";
const number = 4;

const query:SQLSyntax = sqls`SELECT * FROM users WHERE user_id = ${userId} AND number = ${number}`;

// generate SQL & binding parameters array for querying database
const [sql, parameters] = query.toQuery();
const res = await client.query(sql, parameters);
//or 
const res = await client.query(...query.toQuery());

// if the interpolated value is an instance of SQLSyntax, it will be merge into the SQL query
const condition1:SQLSyntax = sqls`user_id = ${userId}`;
const condition2:SQLSyntax = sqls`number = ${number}`;

const query2:SQLSyntax = sqls`SELECT * FROM users WHERE ${condition1} AND ${condition2}`;

// this will create SQL: 
// SELECT * FROM users WHERE user_id = $1 AND number = $2
```

### Replace Built-in `toQuery` Method Logic

The default `toQuery` of `SQLSyntax` object will generate SQL targeting postgreSQL.
If it doesn't work for you, you can replace the logic with your own logic:

```typescript
import SQLSyntax from "sql-syntax";
SQLSyntax.customToQueryFunc = (s:SQLSyntax) => {
    //you won implementation...
}
```

### Re: SQLSyntax.createUnsafely

Although not a common case, you might need to insert a SQL indentifier (e.g. column name) at runtime (e.g. from a string variable) to your SQL query.
`SQLSyntax`.`createUnsafely` allows you to achieve that by directly attach the input string to your SQL query.
Make sure you process the string input well to avoid SQL injection vulnerability.

Alternatively, instead of using `SQLSyntax`.`createUnsafely`, you can use the included `escapeIdentifier` function (for PostgreSQL only) to escape an indentifier. This function will return a SQLSyntax instance so that you don't need to use `SQLSyntax`.`createUnsafely`.
