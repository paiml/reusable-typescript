// Checks importing and exporting between two files.
//
// Contract: main.ts imports add and double from ./math.ts and prints 5 and 42;
// wrong.ts asks for triple, which math.ts does not export, so node stops with
// a SyntaxError and tsc reports TS2305 for that import only.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "main.ts");
assert.equal(run.stdout, "5\n42\n", run.stderr);
console.log("node main.ts:   prints 5 and 42");

const wrong = node(dir, "wrong.ts");
assert.notEqual(wrong.status, 0);
assert.match(wrong.stderr, /SyntaxError: The requested module '\.\/math\.ts' does not provide an export named 'triple'/);
console.log("node wrong.ts:  SyntaxError, no export named 'triple'");

const error = tsc(dir);
assert.deepEqual(error.codes, ["TS2305"], error.stdout);
assert.match(error.stdout, /wrong\.ts\(2,15\): error TS2305: Module '"\.\/math\.ts"' has no exported member 'triple'/);
console.log("tsc:            TS2305 in wrong.ts, main.ts clean");

console.log("contract: import and export (main.ts runs, triple gets TS2305) OK");
