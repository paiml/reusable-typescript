// Checks a rest parameter.
//
// Contract: sum() is 0 and sum(1, 2, 3) is 6; every argument must be a number,
// so tsc reports TS2345 for the "3" in sum(1, 2, "3"), which node turns into "33".
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "sum.ts");
assert.equal(run.stdout, "0\n6\n33\n", run.stderr);
console.log("node sum.ts:  0, 6, then 33 for sum(1, 2, \"3\")");

const error = tsc(dir, "--noEmit", "sum.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /sum\.ts\(12,23\): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'/);
console.log("tsc sum.ts:   TS2345 on line 12, the \"3\"");

console.log("contract: rest parameters (every argument checked, TS2345 for \"3\") OK");
