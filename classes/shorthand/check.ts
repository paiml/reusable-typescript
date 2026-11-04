// Checks what Node does with a parameter property, and with fields written out.
//
// Contract: node refuses point.ts with ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX
// (parameter property, strip-only mode), and runs fields.ts, printing 3 4.
import assert from "node:assert/strict";
import { node } from "../../support/run.ts";

const dir = import.meta.dirname;

const point = node(dir, "point.ts");
assert.notEqual(point.status, 0);
assert.match(point.stderr, /ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX/);
assert.match(point.stderr, /TypeScript parameter property is not supported in strip-only mode/);
console.log("node point.ts:   refused, ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX");

const fields = node(dir, "fields.ts");
assert.equal(fields.stdout, "3 4\n", fields.stderr);
console.log("node fields.ts:  prints 3 4");

console.log("contract: parameter properties refused (fields.ts runs instead) OK");
