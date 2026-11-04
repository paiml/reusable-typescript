// Two ways to write a list type, and a generic function for any list.
const cities: string[] = ["Lima", "Oslo", "Kyoto"];
const scores: Array<number> = [90, 75, 82];

function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

console.log(last(cities), last(scores));
scores.push("100");
console.log(scores);
