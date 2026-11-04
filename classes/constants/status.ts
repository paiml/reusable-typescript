// A constant object in place of an enum: plain JavaScript, plus "as const".
const Status = {
  Active: "active",
  Paused: "paused",
} as const;

console.log(Status.Active, Status.Paused);
Status.Active = "archived";
