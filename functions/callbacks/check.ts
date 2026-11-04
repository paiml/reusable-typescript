// Checks a callback parameter with a function type.
//
// Contract: applyToAll([1, 2, 3], double) gives [2, 4, 6]; shout takes a string,
// so node throws a TypeError for it and tsc reports TS2345: its parameter
// 'text' does not match the Change type's 'value'.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "apply.ts");
assert.equal(run.stdout, "[ 2, 4, 6 ]\n");
assert.match(run.stderr, /TypeError: text\.toUpperCase is not a function/);
console.log("node apply.ts:  [ 2, 4, 6 ], then a TypeError for shout");

const error = tsc(dir, "--noEmit", "apply.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /apply\.ts\(20,35\): error TS2345: Argument of type '\(text: string\) => string' is not assignable to parameter of type 'Change'/);
assert.match(error.stdout, /Types of parameters 'text' and 'value' are incompatible/);
console.log("tsc apply.ts:   TS2345 on line 20, shout is not a Change");

console.log("contract: typed callback (double fits Change, shout gets TS2345) OK");
