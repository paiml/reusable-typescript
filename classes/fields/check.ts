// Checks a class whose constructor sets its field, and one that forgets to.
//
// Contract: counter.ts prints 12 and checks clean; forgot.ts never sets count,
// so node prints NaN, and tsc reports TS2564 for the field.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const counter = node(dir, "counter.ts");
assert.equal(counter.stdout, "12\n", counter.stderr);
assert.equal(tsc(dir, "--noEmit", "counter.ts").status, 0);
console.log("counter.ts:      prints 12, 0 errors");

const forgot = node(dir, "forgot.ts");
assert.equal(forgot.stdout, "starting at 10\nNaN\n", forgot.stderr);
console.log("node forgot.ts:  prints NaN, count was never set");

const error = tsc(dir, "--noEmit", "forgot.ts");
assert.deepEqual(error.codes, ["TS2564"], error.stdout);
assert.match(error.stdout, /Property 'count' has no initializer and is not definitely assigned in the constructor/);
console.log("tsc forgot.ts:   TS2564, count has no initializer");

console.log("contract: fields and constructors (counter.ts clean, forgot.ts TS2564) OK");
