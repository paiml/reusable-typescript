// Checks a parameter with a default value.
//
// Contract: repeat("hip") uses the default of 2 and repeat("hip", 3) repeats
// three times; the default makes times a number, so tsc reports TS2345 for
// repeat("hip", "3"), which node runs and gets wrong ("hip").
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "repeat.ts");
assert.equal(run.stdout, "hip hip\nhip hip hip\nhip\n", run.stderr);
console.log("node repeat.ts:  hip hip, hip hip hip, then hip for \"3\"");

const error = tsc(dir, "--noEmit", "repeat.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /repeat\.ts\(8,27\): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'/);
console.log("tsc repeat.ts:   TS2345 on line 8, only the \"3\" call");

console.log("contract: default values (the default makes times a number) OK");
