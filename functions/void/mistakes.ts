// A void function that returns a value.
function logTotal(total: number): void {
  console.log(`total: ${total}`);
  return total;
}

// No return type written: tsc works out void, and the result is kept anyway.
function logCount(count: number) {
  console.log(`count: ${count}`);
}
const kept: number = logCount(3);
