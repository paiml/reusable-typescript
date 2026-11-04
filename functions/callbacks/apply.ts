// Applies a change to every number in a list.
type Change = (value: number) => number;

function applyToAll(values: number[], change: Change): number[] {
  const result: number[] = [];
  for (const value of values) {
    result.push(change(value));
  }
  return result;
}

function double(value: number): number {
  return value * 2;
}
function shout(text: string): string {
  return text.toUpperCase();
}

console.log(applyToAll([1, 2, 3], double));
console.log(applyToAll([1, 2, 3], shout));
