// Checks a constant object used in place of an enum.
//
// Contract: node runs status.ts and prints active paused; as const makes the
// object's properties read-only, so tsc reports TS2540 for Status.Active = ….
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "status.ts");
assert.equal(run.status, 0, run.stderr);
assert.equal(run.stdout, "active paused\n");
console.log("node status.ts:  runs, prints active paused");

const error = tsc(dir, "--noEmit", "status.ts");
assert.deepEqual(error.codes, ["TS2540"], error.stdout);
assert.match(error.stdout, /Cannot assign to 'Active' because it is a read-only property/);
console.log("tsc status.ts:   TS2540, Active is read-only");

const strict = tsc(dir, "--noEmit", "--erasableSyntaxOnly", "status.ts");
assert.ok(!strict.codes.includes("TS1294"), strict.stdout);
console.log("erasable:        no TS1294, Node can run it as written");

console.log("contract: constant object (runs in node, as const is read-only) OK");
