// Checks what the typed function does, and what tsc says about both files.
//
// Contract: price.ts runs and prints 21.6 and 11.99, tsc finds no errors in it,
// and the same function with no parameter types gets TS7006 for each parameter.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "price.ts");
assert.equal(run.status, 0, run.stderr);
assert.equal(run.stdout, "21.6\n11.99\n");
console.log("node price.ts:     prints 21.6 and 11.99");

const typed = tsc(dir, "--noEmit", "price.ts");
assert.equal(typed.status, 0, typed.stdout);
console.log("tsc price.ts:      0 errors");

const untyped = tsc(dir, "--noEmit", "untyped.ts");
assert.deepEqual(untyped.codes, ["TS7006", "TS7006"], untyped.stdout);
assert.match(untyped.stdout, /Parameter 'price' implicitly has an 'any' type/);
assert.match(untyped.stdout, /Parameter 'rate' implicitly has an 'any' type/);
console.log("tsc untyped.ts:    2 errors, TS7006 for price and rate");

console.log("contract: typed parameters (price.ts clean, untyped.ts gets TS7006 twice) OK");
