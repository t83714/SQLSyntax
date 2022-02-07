# SQLSyntax

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


