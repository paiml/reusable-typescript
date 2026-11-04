// Checks that verbatimModuleSyntax makes tsc refuse what Node refuses.
//
// Contract: with verbatimModuleSyntax, tsc reports TS1484 for the User import
// in wrong.ts and nothing else; with the option off, 0 errors; node refuses
// wrong.ts and runs main.ts, so tsc and node now agree.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const on = tsc(dir);
assert.deepEqual(on.codes, ["TS1484"], on.stdout);
assert.match(on.stdout, /wrong\.ts\(2,10\): error TS1484: 'User' is a type and must be imported using a type-only import/);
console.log("option on:   TS1484 for User in wrong.ts");

const off = tsc(dir, "--verbatimModuleSyntax", "false");
assert.equal(off.status, 0, off.stdout);
console.log("option off:  0 errors");

assert.notEqual(node(dir, "wrong.ts").status, 0);
assert.equal(node(dir, "main.ts").stdout, "Ada from London\n");
console.log("node:        refuses wrong.ts, runs main.ts");

console.log("contract: verbatimModuleSyntax (tsc reports TS1484 where node refuses) OK");
