// Checks void as a return type.
//
// Contract: logTotal(5) prints total: 5 and gives back undefined; a void
// function that returns a number fails with TS2322, and so does keeping the
// result of a function tsc worked out as void.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

assert.equal(tsc(dir, "--noEmit", "log.ts").status, 0);
assert.equal(node(dir, "log.ts").stdout, "total: 5\nundefined\n");
console.log("log.ts:      0 errors, prints total: 5, then undefined");

const wrong = tsc(dir, "--noEmit", "mistakes.ts");
assert.deepEqual(wrong.codes, ["TS2322", "TS2322"], wrong.stdout);
assert.match(wrong.stdout, /Type 'number' is not assignable to type 'void'/);
assert.match(wrong.stdout, /Type 'void' is not assignable to type 'number'/);
console.log("mistakes.ts: TS2322 both ways, number into void and void into number");

console.log("contract: void (nothing to use, both ways checked) OK");
