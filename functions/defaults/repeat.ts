// Repeats a word, twice unless told otherwise.
function repeat(word: string, times = 2): string {
  return Array(times).fill(word).join(" ");
}

console.log(repeat("hip"));
console.log(repeat("hip", 3));
console.log(repeat("hip", "3"));
