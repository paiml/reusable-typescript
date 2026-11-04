// Checks what Node and tsc do with an enum.
//
// Contract: node refuses status.ts with ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX
// (enum, strip-only mode); tsc accepts it by default, and reports TS1294 for
// it with --erasableSyntaxOnly.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "status.ts");
assert.notEqual(run.status, 0);
assert.match(run.stderr, /TypeScript enum is not supported in strip-only mode/);
console.log("node status.ts:           refused, enum not supported");

const plain = tsc(dir, "--noEmit", "status.ts");
assert.equal(plain.status, 0, plain.stdout);
console.log("tsc status.ts:            0 errors");

const strict = tsc(dir, "--noEmit", "--erasableSyntaxOnly", "status.ts");
assert.deepEqual(strict.codes, ["TS1294"], strict.stdout);
console.log("tsc --erasableSyntaxOnly: TS1294 on the enum");

console.log("contract: enum refused (node refuses it, tsc only with the option) OK");
