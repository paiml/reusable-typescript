// Adds tax to a price and rounds the result to cents.
function withTax(price: number, rate: number): number {
  const total = price * (1 + rate);
  return Math.round(total * 100) / 100;
}

console.log(withTax(20, 0.08));
console.log(withTax(9.99, 0.2));
