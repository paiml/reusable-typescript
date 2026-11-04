// Checks a call that breaks a generic constraint.
//
// Contract: numbers have no length, so tsc reports TS2345 for longest(10, 200),
// which node runs and answers 200 by accident.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "longest.ts");
assert.equal(run.stdout, "apple\n200\n", run.stderr);
console.log("node longest.ts:  apple, then 200 for two numbers");

const error = tsc(dir, "--noEmit", "longest.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /longest\.ts\(7,21\): error TS2345: Argument of type 'number' is not assignable to parameter of type '\{ length: number; \}'/);
console.log("tsc longest.ts:   TS2345 on line 7, numbers have no length");

console.log("contract: constraint error (longest(10, 200) gets TS2345) OK");
