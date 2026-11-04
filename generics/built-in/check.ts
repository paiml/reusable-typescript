// Checks Array, Record and Promise, the generic types TypeScript comes with.
//
// Contract: built-in.ts prints the tags, the stock and 12, and checks clean;
// forgot-await.ts prints [object Promise]1, and tsc reports TS2322 because a
// Promise<number> is not a number.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "built-in.ts");
assert.equal(run.stdout, "[ 'new', 'sale' ] { apples: 3, pears: 0 } 12\n", run.stderr);
assert.equal(tsc(dir, "--noEmit", "built-in.ts").status, 0);
console.log("built-in.ts:      prints the lists and 12, 0 errors");

const forgot = node(dir, "forgot-await.ts");
assert.equal(forgot.stdout, "[object Promise]1\n", forgot.stderr);
const error = tsc(dir, "--noEmit", "forgot-await.ts");
assert.deepEqual(error.codes, ["TS2322"], error.stdout);
assert.match(error.stdout, /Type 'Promise<number>' is not assignable to type 'number'/);
console.log("forgot-await.ts:  [object Promise]1, TS2322");

console.log("contract: built-in generics (a Promise<number> is not a number) OK");
