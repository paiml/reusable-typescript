// Generic types that come with TypeScript: Array, Record and Promise.
const tags: Array<string> = ["new", "sale"];
const stock: Record<string, number> = { apples: 3, pears: 0 };

async function countOrders(): Promise<number> {
  return 12;
}

const orders = await countOrders();
console.log(tags, stock, orders);

export {};
