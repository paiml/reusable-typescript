// Turns cents into a price to print, like "EUR 9.75".
import type { Currency } from "./currency.ts";

export function formatPrice(cents: number, currency: Currency): string {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}

// Adds up one number from every element of a list.
export function sumBy<T>(items: T[], value: (item: T) => number): number {
  let total = 0;
  for (const item of items) {
    total += value(item);
  }
  return total;
}
