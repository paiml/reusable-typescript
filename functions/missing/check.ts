// Checks what a missing argument does at runtime, and what tsc says about it.
//
// Contract: add(1) leaves b undefined, so node prints NaN for it, and tsc
// reports TS2554 (expected 2 arguments, but got 1) on that call only.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "add.ts");
assert.equal(run.stdout, "3\nNaN\n", run.stderr);
console.log("node add.ts:   prints 3, then NaN for add(1)");

const error = tsc(dir, "--noEmit", "add.ts");
assert.deepEqual(error.codes, ["TS2554"], error.stdout);
assert.match(error.stdout, /add\.ts\(7,13\): error TS2554: Expected 2 arguments, but got 1\./);
console.log("tsc add.ts:    TS2554 on line 7, add(1)");

console.log("contract: missing argument (node prints NaN, tsc reports TS2554) OK");
