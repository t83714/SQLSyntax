import {} from "mocha";
import { expect } from "chai";
import SQLSyntax, { sqls } from "../index.js";

describe("Test SQL interpolation", () => {
    it("Should interpolate value correctly", () => {
        const var1 = 123;
        const var2 = "abc";
        const query =
            sqls`SELECT * FROM x WHERE name = ${var2} AND id = ${var1}`.toQuery();
        expect(query[0]).to.be.equal(
            "SELECT * FROM x WHERE name = $1 AND id = $2"
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
        const query = sqls`SELECT * FROM x ${where}`.toQuery();
        expect(query[0]).to.be.equal(
            "SELECT * FROM x  WHERE name = $1 AND id = $2"
        );
        expect(query[1]).to.have.ordered.members(["abc", 123]);
    });
});

describe("Test IN clause", () => {
    it("Should work with IN method", () => {
        const q = sqls`SELECT * FROM b WHERE ${sqls`col1`.in([
            3,
            "abc",
            9
        ])}`.toQuery();
        expect(q[0]).to.be.equal("SELECT * FROM b WHERE col1 IN ($1,$2,$3)");
        expect(q[1]).to.have.ordered.members([3, "abc", 9]);
    });

    it("Should work with SQLSyntax.IN static method", () => {
        const q = sqls`SELECT * FROM b WHERE ${SQLSyntax.in(sqls`col1`, [
            3,
            "abc",
            9
        ])}`.toQuery();
        expect(q[0]).to.be.equal("SELECT * FROM b WHERE col1 IN ($1,$2,$3)");
        expect(q[1]).to.have.ordered.members([3, "abc", 9]);
    });

    it("Should throw an error when empty value array", () => {
        let err: Error;
        try {
            sqls`SELECT * FROM b WHERE ${sqls`col1`.in([])}`.toQuery();
        } catch (e) {
            err = e;
        }
        expect(err).to.be.instanceOf(Error);
    });

    it("Should throw an error when SQLSyntax instance is an empty statement", () => {
        let err: Error;
        try {
            SQLSyntax.empty.in([]).toQuery();
        } catch (e) {
            err = e;
        }
        expect(err).to.be.instanceOf(Error);
    });
});
