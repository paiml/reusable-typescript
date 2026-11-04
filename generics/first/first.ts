// A generic function: T is whatever type of list it is given.
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const city = first(["Lima", "Oslo"]);
const score = first([90, 75]);

console.log(city, score);
