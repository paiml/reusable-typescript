// Checks an async function and await.
//
// Contract: double(2) gives back a promise, Promise { 4 }, and awaiting it
// gives 4, with 0 errors; an async function typed as number fails with
// TS1064, and await in a function that isn't async fails with TS1308.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

assert.equal(tsc(dir, "--noEmit", "double.ts").status, 0);
assert.equal(node(dir, "double.ts").stdout, "Promise { 4 }\n4\n");
console.log("double.ts:   0 errors, prints Promise { 4 }, then 4");

const wrong = tsc(dir, "--noEmit", "mistakes.ts");
assert.deepEqual(wrong.codes, ["TS1064", "TS1308"], wrong.stdout);
console.log("mistakes.ts: TS1064 for a number return type, TS1308 for await");

console.log("contract: async functions (a promise, then its value) OK");
