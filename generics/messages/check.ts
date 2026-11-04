// Checks a generic error message with two levels.
//
// Contract: tsc reports one TS2345: Promise<string> is not Promise<number>,
// and the indented line under it gives the reason, string is not number.
import assert from "node:assert/strict";
import { tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const error = tsc(dir, "--noEmit", "totals.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /totals\.ts\(8,22\): error TS2345: Argument of type 'Promise<string>' is not assignable to parameter of type 'Promise<number>'\.\n  Type 'string' is not assignable to type 'number'\./);
console.log("top line:     Promise<string> is not Promise<number>");
console.log("indented:     Type 'string' is not assignable to type 'number'");

console.log("contract: generic messages (the indented line says why) OK");
