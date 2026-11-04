// T must have a length: strings, arrays, anything with a length property.
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("apple", "fig"));
console.log(longest([1, 2], [1, 2, 3]));
