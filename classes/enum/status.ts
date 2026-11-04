// An enum: TypeScript turns it into an object, so it is more than a type.
enum Status {
  Active,
  Paused,
}

console.log(Status.Active, Status.Paused);
