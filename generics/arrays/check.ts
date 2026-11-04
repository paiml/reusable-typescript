// Checks two ways of writing a list type, and a generic function over lists.
//
// Contract: last() returns Kyoto and 82; node lets "100" into the numbers, and
// tsc reports TS2345 for scores.push("100") only.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "lists.ts");
assert.equal(run.stdout, "Kyoto 82\n[ 90, 75, 82, '100' ]\n", run.stderr);
console.log("node lists.ts:  Kyoto 82, then '100' among the numbers");

const error = tsc(dir, "--noEmit", "lists.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /lists\.ts\(10,13\): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'/);
console.log("tsc lists.ts:   TS2345 on line 10, the push");

console.log("contract: generic arrays (Array<number> only takes numbers) OK");
