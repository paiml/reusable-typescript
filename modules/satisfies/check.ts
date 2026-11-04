// Checks a config object with a typo, with and without satisfies.
//
// Contract: loose.ts has the typo hsot and nothing to check it against, so tsc
// finds 0 errors; config.ts adds satisfies Settings, and tsc reports TS2353
// for hsot. Both run in node and print 8080.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

for (const file of ["loose.ts", "config.ts"]) {
  assert.equal(node(dir, file).stdout, "8080\n");
}
console.log("node:       both files print 8080");

const loose = tsc(dir, "--noEmit", "loose.ts");
assert.equal(loose.status, 0, loose.stdout);
console.log("loose.ts:   0 errors, the typo goes through");

const checked = tsc(dir, "--noEmit", "config.ts");
assert.deepEqual(checked.codes, ["TS2353"], checked.stdout);
assert.match(checked.stdout, /config\.ts\(6,3\): error TS2353: .*'hsot' does not exist in type 'Settings'/);
console.log("config.ts:  TS2353, 'hsot' does not exist in type 'Settings'");

console.log("contract: satisfies (the typo hsot gets TS2353) OK");
