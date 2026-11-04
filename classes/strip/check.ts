// Checks what Node does with a file that only adds types.
//
// Contract: erase.ts (a type alias, an interface, an assertion and
// annotations) runs in Node and prints Ada 1; when lines.ts throws, Node
// points at line 5, column 9, the line the throw is on in the source.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

assert.equal(tsc(dir, "--noEmit", "erase.ts").status, 0);
assert.equal(node(dir, "erase.ts").stdout, "Ada 1\n");
console.log("erase.ts: the types are removed, prints Ada 1");

const thrown = node(dir, "lines.ts");
assert.match(thrown.stderr, /Error: boom/);
assert.match(thrown.stderr, /lines\.ts:5:9\)/);
const source = readFileSync(`${dir}/lines.ts`, "utf8").split("\n");
assert.match(source[4], /throw new Error\("boom"\)/);
console.log("lines.ts: Node's error points at 5:9, the throw in the source");

console.log("contract: what Node removes (the types, and the lines stay put) OK");
