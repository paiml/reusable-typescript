// Checks that erasableSyntaxOnly makes tsc refuse what Node refuses.
//
// Contract: with erasableSyntaxOnly, tsc reports TS1294 for both parameter
// properties in point.ts and nothing else; with it off, 0 errors; and node
// refuses point.ts with ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const on = tsc(dir);
assert.deepEqual(on.codes, ["TS1294", "TS1294"], on.stdout);
assert.match(on.stdout, /point\.ts\(3,15\): error TS1294/);
assert.match(on.stdout, /point\.ts\(3,33\): error TS1294/);
console.log("erasableSyntaxOnly on:   2 errors, TS1294 for x and y");

const off = tsc(dir, "--erasableSyntaxOnly", "false");
assert.equal(off.status, 0, off.stdout);
console.log("erasableSyntaxOnly off:  0 errors");

const run = node(dir, "point.ts");
assert.match(run.stderr, /ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX/);
console.log("node point.ts:           refused");

console.log("contract: erasableSyntaxOnly (TS1294 where node refuses) OK");
