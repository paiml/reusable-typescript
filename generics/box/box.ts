// A generic type: a Box holds a value of whatever type it is given.
type Box<T> = { label: string; value: T };

const age: Box<number> = { label: "age", value: 36 };
const city: Box<string> = { label: "city", value: "Lima" };
const wrong: Box<number> = { label: "height", value: "1.70" };

console.log(age, city, wrong);
