// An async function returns a promise of its value.
async function double(n: number): Promise<number> {
  return n * 2;
}

async function main() {
  const ticket = double(2);
  console.log(ticket);
  console.log(await ticket);
}

main();
