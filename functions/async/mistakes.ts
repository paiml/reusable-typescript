// An async function that says it returns a plain number.
async function triple(n: number): number {
  return n * 3;
}

// await inside a function that isn't async.
function show() {
  const value = await triple(2);
  console.log(value);
}
