// Checks importing a type with "import type".
//
// Contract: main.ts brings in User with import type and runs; wrong.ts imports
// User as a value, and node stops with a SyntaxError, because User is a type
// and nothing named User exists once the types are removed.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "main.ts");
assert.equal(run.stdout, "Ada from London\n", run.stderr);
console.log("node main.ts:   prints Ada from London");

const wrong = node(dir, "wrong.ts");
assert.notEqual(wrong.status, 0);
assert.match(wrong.stderr, /SyntaxError: The requested module '\.\/user\.ts' does not provide an export named 'User'/);
console.log("node wrong.ts:  SyntaxError, no export named 'User'");

const checked = tsc(dir);
assert.equal(checked.status, 0, checked.stdout);
console.log("tsc:            0 errors without verbatimModuleSyntax");

console.log("contract: import type (main.ts runs, wrong.ts refused by node) OK");
