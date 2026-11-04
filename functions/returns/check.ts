// Checks what a wrong return type does at runtime, and what tsc says about it.
//
// Contract: half.ts returns a string where it promises a number, so node prints
// 4.51 instead of 5.5, and tsc reports TS2322 on that return; fixed.ts, which
// returns n / 2, prints 5.5 and checks clean.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const wrong = node(dir, "half.ts");
assert.equal(wrong.stdout, "4.51\n", wrong.stderr);
console.log("node half.ts:    prints 4.51, a string joined to 1");

const error = tsc(dir, "--noEmit", "half.ts");
assert.deepEqual(error.codes, ["TS2322"], error.stdout);
assert.match(error.stdout, /half\.ts\(3,3\): error TS2322: Type 'string' is not assignable to type 'number'/);
console.log("tsc half.ts:     TS2322 on line 3, the return");

const fixed = node(dir, "fixed.ts");
assert.equal(fixed.stdout, "5.5\n", fixed.stderr);
const clean = tsc(dir, "--noEmit", "fixed.ts");
assert.equal(clean.status, 0, clean.stdout);
console.log("fixed.ts:        prints 5.5, 0 errors");

console.log("contract: wrong return type (TS2322 on the return, fixed.ts prints 5.5) OK");
