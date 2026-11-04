// With no constraint, T could be anything, so it might have no length.
function size<T>(value: T): number {
  return value.length;
}

console.log(size("hello"));
