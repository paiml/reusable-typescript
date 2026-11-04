// The same function with no types on its parameters.
function withTax(price, rate) {
  const total = price * (1 + rate);
  return Math.round(total * 100) / 100;
}

console.log(withTax(20, 0.08));
