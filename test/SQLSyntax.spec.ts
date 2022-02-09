import {} from "mocha";
import { expect } from "chai";
import SQLSyntax, { sqls } from "sql-syntax";

describe("Test SQL interpolation", () => {
    it("Should interpolate value correctly", () => {
        const var1 = 123;
        const var2 = "abc";
        const query =
            sqls`SELECT * FROM WHERE name = ${var2} AND id = ${var1}`.toQuery();
        expect(query[0]).to.be.equal(
            "SELECT * FROM WHERE name = $1 AND id = $2"
        );
        expect(query[1]).to.have.ordered.members(["abc", 123]);
    });

    it("Should interpolate SQLSyntax correctly", () => {
        const var1 = 123;
        const var2 = "abc";
        const condition1 = sqls`name = ${var2}`;
        const condition2 = sqls`id = ${var1}`;
        const condition3 = SQLSyntax.empty;
        const where = SQLSyntax.where(
            SQLSyntax.joinWithAnd([condition1, condition3, condition2])
        );
        const query = sqls`SELECT * FROM ${where}`.toQuery();
        expect(query[0]).to.be.equal(
            "SELECT * FROM  WHERE name = $1 AND id = $2"
        );
        expect(query[1]).to.have.ordered.members(["abc", 123]);
    });
});
