// Checks TypeScript's private against JavaScript's #private.
//
// Contract: account.ts reads its private balance from outside: node prints it
// (150), and only tsc objects, with TS2341; wallet.ts reads #balance from
// outside: node itself refuses with a SyntaxError, and tsc reports TS18013.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const account = node(dir, "account.ts");
assert.equal(account.stdout, "150\n150\n", account.stderr);
console.log("node account.ts:  prints 150 from outside the class");

const ts = tsc(dir, "--noEmit", "account.ts");
assert.deepEqual(ts.codes, ["TS2341"], ts.stdout);
console.log("tsc account.ts:   TS2341, balance is private");

const wallet = node(dir, "wallet.ts");
assert.notEqual(wallet.status, 0);
assert.match(wallet.stderr, /SyntaxError: Private field '#balance' must be declared in an enclosing class/);
console.log("node wallet.ts:   SyntaxError, #balance stays inside");

const js = tsc(dir, "--noEmit", "wallet.ts");
assert.deepEqual(js.codes, ["TS18013"], js.stdout);
console.log("tsc wallet.ts:    TS18013, #balance is not accessible");

console.log("contract: private fields (private is tsc only, #private is Node too) OK");
