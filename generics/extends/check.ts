// Checks a generic function with and without a constraint.
//
// Contract: with no constraint, tsc reports TS2339 (no length on T); with
// T extends { length: number }, longest() prints apple and [ 1, 2, 3 ] and
// checks clean.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const loose = tsc(dir, "--noEmit", "size.ts");
assert.deepEqual(loose.codes, ["TS2339"], loose.stdout);
assert.match(loose.stdout, /Property 'length' does not exist on type 'T'/);
console.log("size.ts:     TS2339, T might have no length");

const run = node(dir, "longest.ts");
assert.equal(run.stdout, "apple\n[ 1, 2, 3 ]\n", run.stderr);
assert.equal(tsc(dir, "--noEmit", "longest.ts").status, 0);
console.log("longest.ts:  prints apple and [ 1, 2, 3 ], 0 errors");

console.log("contract: generic constraint (size.ts TS2339, longest.ts clean) OK");
