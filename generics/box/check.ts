// Checks a generic type: a Box of numbers, a Box of strings, and a wrong one.
//
// Contract: node prints all three boxes; tsc reports one TS2322, for the
// Box<number> whose value is the string "1.70".
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "box.ts");
assert.match(run.stdout, /value: '1\.70'/, run.stderr);
console.log("node box.ts:  prints all three boxes, '1.70' too");

const error = tsc(dir, "--noEmit", "box.ts");
assert.deepEqual(error.codes, ["TS2322"], error.stdout);
assert.match(error.stdout, /box\.ts\(6,47\): error TS2322: Type 'string' is not assignable to type 'number'/);
console.log("tsc box.ts:   TS2322 on line 6, a string in a Box<number>");

console.log("contract: generic box (Box<number> holds numbers only) OK");
