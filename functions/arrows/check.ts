// Checks arrow functions and the parameter types tsc works out for them.
//
// Contract: square(3) is 9 and doubling the prices gives [8, 20, 5]; the
// callback's price has no annotation, yet tsc knows it is a number and reports
// TS2339 for price.toUpperCase(), which node only finds out by throwing.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "prices.ts");
assert.equal(run.stdout, "9\n[ 8, 20, 5 ]\n");
assert.match(run.stderr, /TypeError: price\.toUpperCase is not a function/);
console.log("node prices.ts:  9, [ 8, 20, 5 ], then a TypeError");

const error = tsc(dir, "--noEmit", "prices.ts");
assert.deepEqual(error.codes, ["TS2339"], error.stdout);
assert.match(error.stdout, /prices\.ts\(9,41\): error TS2339: Property 'toUpperCase' does not exist on type 'number'/);
console.log("tsc prices.ts:   TS2339, price is a number");

console.log("contract: arrow functions (price is inferred as a number) OK");
