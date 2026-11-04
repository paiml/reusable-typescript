// A shopping cart, with its fields written out so Node runs it as it is.
import type { Currency } from "./currency.ts";
import type { Item } from "./item.ts";
import { formatPrice, sumBy } from "./money.ts";

export class Cart {
  readonly currency: Currency;
  #items: Item[] = [];

  constructor(currency: Currency) {
    this.currency = currency;
  }

  add(name: string, cents: number, quantity = 1): void {
    this.#items.push({ name, cents, quantity });
  }

  total(): string {
    const cents = sumBy(this.#items, (item) => item.cents * item.quantity);
    return formatPrice(cents, this.currency);
  }
}
