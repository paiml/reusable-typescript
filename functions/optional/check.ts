// Checks an optional parameter used safely, and one used without a check.
//
// Contract: greet.ts handles a missing title and checks clean; shout.ts calls
// title.toUpperCase() without checking, so node throws a TypeError for
// shout("Ada"), and tsc reports TS18048 ('title' is possibly 'undefined').
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const greet = node(dir, "greet.ts");
assert.equal(greet.stdout, "Hello, Ada!\nHello, Dr. Ada!\n", greet.stderr);
assert.equal(tsc(dir, "--noEmit", "greet.ts").status, 0);
console.log("greet.ts:       both calls work, 0 errors");

const shout = node(dir, "shout.ts");
assert.notEqual(shout.status, 0);
assert.match(shout.stderr, /TypeError: Cannot read properties of undefined \(reading 'toUpperCase'\)/);
console.log("node shout.ts:  TypeError when the title is missing");

const error = tsc(dir, "--noEmit", "shout.ts");
assert.deepEqual(error.codes, ["TS18048"], error.stdout);
assert.match(error.stdout, /'title' is possibly 'undefined'/);
console.log("tsc shout.ts:   TS18048, 'title' is possibly 'undefined'");

console.log("contract: optional parameter (greet.ts clean, shout.ts gets TS18048) OK");
