// Checks a union type made from a constant object's values.
//
// Contract: node prints all three lines, "archived" too; tsc accepts
// Status.Active and "paused" and reports TS2345 for "archived" only.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "status.ts");
assert.equal(run.stdout, "the account is active\nthe account is paused\nthe account is archived\n", run.stderr);
console.log("node status.ts:  prints all three, archived too");

const error = tsc(dir, "--noEmit", "status.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /status\.ts\(15,22\): error TS2345: Argument of type '"archived"' is not assignable to parameter of type 'Status'/);
console.log("tsc status.ts:   TS2345 on line 15 only, \"archived\"");

console.log("contract: union from values (only active and paused are a Status) OK");
