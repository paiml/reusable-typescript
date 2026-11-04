// Checks keyof: a parameter that only takes an object's own keys.
//
// Contract: field(ada, "city") prints London; "email" is not a key of User,
// so node prints undefined and tsc reports TS2345 for it.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "user.ts");
assert.equal(run.stdout, "London\nundefined\n", run.stderr);
console.log("node user.ts:  London, then undefined for \"email\"");

const error = tsc(dir, "--noEmit", "user.ts");
assert.deepEqual(error.codes, ["TS2345"], error.stdout);
assert.match(error.stdout, /Argument of type '"email"' is not assignable to parameter of type 'keyof User'/);
console.log("tsc user.ts:   TS2345, \"email\" is not a keyof User");

console.log("contract: keyof (only \"city\" and \"age\" are accepted) OK");
