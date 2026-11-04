// Uses the library the way another program would.
import { Cart, Currency } from "./index.ts";

const cart = new Cart(Currency.Euro);
cart.add("coffee", 350, 2);
cart.add("croissant", 275);

console.log(`total: ${cart.total()}`);
