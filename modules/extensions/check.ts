// Checks that an import in Node's ES modules names the file in full.
//
// Contract: main.ts imports "./math" with no extension, so node cannot find the
// module (ERR_MODULE_NOT_FOUND) and tsc, with module nodenext, reports TS2835;
// fixed.ts imports "./math.ts", runs and prints 5 and 42.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const missing = node(dir, "main.ts");
assert.notEqual(missing.status, 0);
assert.match(missing.stderr, /ERR_MODULE_NOT_FOUND/);
console.log("node main.ts:   ERR_MODULE_NOT_FOUND for ./math");

const error = tsc(dir);
assert.deepEqual(error.codes, ["TS2835"], error.stdout);
assert.match(error.stdout, /main\.ts\(2,29\): error TS2835: Relative import paths need explicit file extensions/);
console.log("tsc:            TS2835 in main.ts, fixed.ts clean");

const fixed = node(dir, "fixed.ts");
assert.equal(fixed.stdout, "5\n42\n", fixed.stderr);
console.log("node fixed.ts:  prints 5 and 42");

console.log("contract: file extensions (./math refused twice, ./math.ts runs) OK");
