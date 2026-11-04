// Totals for each day, kept in a Map of day names to promised numbers.
const totals = new Map<string, Promise<number>>();

async function total(day: string): Promise<string> {
  return `${day}: 42`;
}

totals.set("monday", total("monday"));
