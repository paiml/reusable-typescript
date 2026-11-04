// Checks a read-only field.
//
// Contract: node lets ticket.id change (it prints T-999 14C), and tsc reports
// TS2540 for the assignment to id only, not for the seat.
import assert from "node:assert/strict";
import { node, tsc } from "../../support/run.ts";

const dir = import.meta.dirname;

const run = node(dir, "ticket.ts");
assert.equal(run.stdout, "T-999 14C\n", run.stderr);
console.log("node ticket.ts:  prints T-999 14C, the id changed");

const error = tsc(dir, "--noEmit", "ticket.ts");
assert.deepEqual(error.codes, ["TS2540"], error.stdout);
assert.match(error.stdout, /ticket\.ts\(14,8\): error TS2540: Cannot assign to 'id' because it is a read-only property/);
console.log("tsc ticket.ts:   TS2540 on line 14 only, the id");

console.log("contract: read-only fields (TS2540 for id, the seat can change) OK");
