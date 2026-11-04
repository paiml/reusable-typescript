const a: number = 1;
const b: string = "two";

function fail(): never {
  throw new Error("boom");
}

fail();
