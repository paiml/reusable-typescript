// T must have a length, and numbers don't have one.
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("apple", "fig"));
console.log(longest(10, 200));
