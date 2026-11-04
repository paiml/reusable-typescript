// Checks that a generic function works out its type from what it is given.
//
// Contract: first.ts prints Lima 90 and checks clean; in mistake.ts, T is
// string, so storing the result in a number gets TS2322.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "first.ts");
assert.equal(run.stdout, "Lima 90\n", run.stderr);
assert.equal(tsc(dir, "--noEmit", "first.ts").status, 0);
console.log("first.ts:     prints Lima 90, 0 errors");

const error = tsc(dir, "--noEmit", "mistake.ts");
assert.deepEqual(error.codes, ["TS2322"], error.stdout);
assert.match(error.stdout, /Type 'string \| undefined' is not assignable to type 'number \| undefined'/);
console.log("mistake.ts:   TS2322, the result is a string, not a number");

console.log("contract: generic inference (T is string for a list of strings) OK");
