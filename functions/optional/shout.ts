// Greets someone in capitals, but forgets the title may be missing.
function shout(person: string, title?: string): string {
  return `HELLO, ${title.toUpperCase()} ${person.toUpperCase()}!`;
}

console.log(shout("Ada", "Dr."));
console.log(shout("Ada"));
