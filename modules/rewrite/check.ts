// Checks that tsc rewrites .ts imports to .js when it writes JavaScript.
//
// Contract: src/main.ts imports "./math.ts" and runs as it is; tsc writes
// dist/main.js and dist/math.js, the import in dist/main.js says "./math.js",
// and node runs dist/main.js with the same output.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const source = node(dir, "src/main.ts");
assert.equal(source.stdout, "5\n42\n", source.stderr);
console.log("node src/main.ts:   prints 5 and 42");

rmSync(path.join(dir, "dist"), { recursive: true, force: true });
const built = tsc(dir);
assert.equal(built.status, 0, built.stdout);
assert.deepEqual(readdirSync(path.join(dir, "dist")).sort(), ["main.js", "math.js"]);
const js = readFileSync(path.join(dir, "dist", "main.js"), "utf8");
assert.match(js, /from "\.\/math\.js"/);
assert.doesNotMatch(js, /math\.ts"/);
console.log('dist/main.js:       imports "./math.js"');

const output = node(dir, "dist/main.js");
assert.equal(output.stdout, source.stdout, output.stderr);
console.log("node dist/main.js:  prints the same 5 and 42");

console.log("contract: rewritten imports (./math.ts becomes ./math.js) OK");
