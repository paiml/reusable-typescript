// Greets someone, with a title if one is given.
function greet(person: string, title?: string): string {
  if (title === undefined) {
    return `Hello, ${person}!`;
  }
  return `Hello, ${title} ${person}!`;
}

console.log(greet("Ada"));
console.log(greet("Ada", "Dr."));
