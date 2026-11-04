// Arrow functions: a shorter way to write a function.
const square = (n: number): number => n * n;

const prices = [4, 10, 2.5];
const doubled = prices.map((price) => price * 2);

console.log(square(3));
console.log(doubled);
console.log(prices.map((price) => price.toUpperCase()));
