// Adds up any number of numbers.
function sum(...numbers: number[]): number {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

console.log(sum());
console.log(sum(1, 2, 3));
console.log(sum(1, 2, "3"));
