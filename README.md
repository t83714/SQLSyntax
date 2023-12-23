# SQLSyntax

![npm](https://img.shields.io/npm/v/sql-syntax?style=plastic)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/t83714/SQLSyntax/main.yml?branch=main)

Tagged template literals utilities for ease of composing SQL queries. 
This is a javascript port of ScalikeJBDC's [SQLSyntax](http://scalikejdbc.org/documentation/sql-interpolation.html#sqlsyntax) class.

> Please note: from v2.0.0, this package has been released as pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) module. To move your CommonJS project to ESM, [@sindresorhus's post](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) is worth to read.


### API document

https://t83714.github.io/SQLSyntax/

The [`SQLSyntax` class](https://t83714.github.io/SQLSyntax/classes/SQLSyntax.html) also comes with many useful SQL query composing helper functions. e.g. `joinWithAnd`, `where` etc. For more information, please refer to [the API document](https://t83714.github.io/SQLSyntax/classes/SQLSyntax.html). 

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
    //you own implementation...
}
```

### Specify Column or Table Names in Query with Variables

> For most cases, you should not need to specify a SQL indentifier (e.g. column name) at runtime (e.g. from a string variable) in a SQL Query. You should think about whether it's possible (for most cases, it should be possible) to avoid using `createUnsafely` method to specify a SQL indentifier using runtime varilable.

By default, `SQLSyntax`'s sqls function will treat any string interpolation values as query parameters for safety concerns. Thus, you won't be able to insert a SQL indentifier (e.g. column or table names) at runtime (e.g. from a string variable) to your SQL query. e.g.:

```typescript
import SQLSyntax, {sqls} from "sql-syntax";
const myColumnName: string = "field1";
const query = sqls`SELECT ${myColumnName} FROM users`;
const [sql, parameters] = query.toQuery();
// sql: SELECT $1 FROM users
// parameters: ["field1"]
```

To make it possible, SQLSyntax offers a `createUnsafely` method that allow you to create an instance of SQLSyntax class from any plain string.
For the same example above, we can use `createUnsafely` method to create the desired query:

```typescript
import SQLSyntax, {sqls} from "sql-syntax";
const myColumnName:SQLSyntax = SQLSyntax.createUnsafely("field1");
const query = sqls`SELECT ${myColumnName} FROM users`;
const [sql, parameters] = query.toQuery();
// sql: SELECT field1 FROM users
// parameters: []
```

As the content of the string variable will become part of SQL query via the `createUnsafely` method. You need to valiate / process the input string properly by yourself to avoid SQL injection vulnerabilities when use the `createUnsafely` method.

Alternatively, you can also use the included `escapeIdentifier` function (for PostgreSQL only) to escape an indentifier. This function will return a SQLSyntax instance as well but will try to filter / escape any invalid characters to make sure the resulted indentifier string is always safe to be included in a SQL query.
