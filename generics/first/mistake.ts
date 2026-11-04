// T is worked out from the list, so this result is a string, not a number.
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const count: number | undefined = first(["Lima", "Oslo"]);

console.log(count);
