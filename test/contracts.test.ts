// Every example's check program must exit 0 and print its `contract: … OK`
// line. A demo can only be recorded when its contract holds, so this is the
// same gate, run for all of them at once with `npm test`.
//
// The check programs are found, not listed: every check.ts in the repository,
// each run from its own folder, the way the commands in README.md run it.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const root = path.join(import.meta.dirname, "..");
const programs = readdirSync(root, { recursive: true, encoding: "utf8" })
  .filter((f) => path.basename(f) === "check.ts" && !f.startsWith("node_modules"))
  .sort();

assert.ok(programs.length > 0, "no check.ts found");

for (const program of programs) {
  test(program, () => {
    const out = execFileSync("node", ["check.ts"], { cwd: path.join(root, path.dirname(program)), encoding: "utf8" });
    assert.match(out, /^contract: .* OK$/m);
  });
}
