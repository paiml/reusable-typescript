// A Promise<number> is not a number yet: it has to be awaited first.
async function countOrders(): Promise<number> {
  return 12;
}

const orders: number = countOrders();
console.log(orders + 1);

export {};
