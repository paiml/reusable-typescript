// A union type made from the object's values: "active" | "paused".
const Status = {
  Active: "active",
  Paused: "paused",
} as const;

type Status = (typeof Status)[keyof typeof Status];

function describe(status: Status): string {
  return `the account is ${status}`;
}

console.log(describe(Status.Active));
console.log(describe("paused"));
console.log(describe("archived"));
