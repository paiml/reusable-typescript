// Proves the library does what BRIEF.md asks, one step at a time.
//
// Contract: tsc checks src with no errors under erasableSyntaxOnly and
// verbatimModuleSyntax; node runs the receipt from source; the build writes a
// .js and a .d.ts for every module; the built receipt prints the same total;
// and the built types reject a currency the library doesn't have.
import assert from "node:assert/strict";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { node, tsc } from "../support/run.ts";

const dir = import.meta.dirname;
const sources = readdirSync(path.join(dir, "src")).filter((f) => f.endsWith(".ts")).sort();

// Step 1: tsc checks every file in src, with the options in tsconfig.json.
const config = JSON.parse(readFileSync(path.join(dir, "tsconfig.json"), "utf8"));
assert.equal(config.compilerOptions.erasableSyntaxOnly, true);
assert.equal(config.compilerOptions.verbatimModuleSyntax, true);
const checked = tsc(dir, "-p", ".", "--noEmit");
assert.equal(checked.status, 0, checked.stdout);
console.log(`checked:  ${sources.length} modules in src, 0 errors`);

// Step 2: node runs the receipt straight from the TypeScript source.
const fromSource = node(dir, "src/receipt.ts");
assert.equal(fromSource.stdout, "total: EUR 9.75\n", fromSource.stderr);
console.log("source:   node src/receipt.ts prints total: EUR 9.75");

// Step 3: tsc builds dist: a .js and a .d.ts for every module.
rmSync(path.join(dir, "dist"), { recursive: true, force: true });
const built = tsc(dir, "-p", ".");
assert.equal(built.status, 0, built.stdout);
const output = readdirSync(path.join(dir, "dist")).sort();
const expected = sources.flatMap((f) => [f.replace(/\.ts$/, ".d.ts"), f.replace(/\.ts$/, ".js")]).sort();
assert.deepEqual(output, expected);
console.log(`built:    dist has ${output.length} files, a .js and a .d.ts per module`);

// Step 4: the built JavaScript prints the same receipt.
const fromDist = node(dir, "dist/receipt.js");
assert.equal(fromDist.stdout, fromSource.stdout, fromDist.stderr);
console.log("dist:     node dist/receipt.js prints the same total");

// Step 5: the built types reject a currency the library doesn't have.
const misuse = path.join(dir, ".check-misuse");
mkdirSync(misuse, { recursive: true });
writeFileSync(path.join(misuse, "yen.ts"), 'import { Cart } from "../dist/index.js";\nnew Cart("JPY");\n');
const rejected = tsc(misuse, "--ignoreConfig", "--noEmit", "--module", "nodenext", "yen.ts");
rmSync(misuse, { recursive: true, force: true });
assert.deepEqual(rejected.codes, ["TS2345"], rejected.stdout);
console.log('types:    new Cart("JPY") is rejected with TS2345');

console.log("contract: typed library (checked, runs as written, built with types) OK");
