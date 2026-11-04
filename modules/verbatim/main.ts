// "import type" brings in a type, and nothing at runtime.
import type { User } from "./user.ts";
import { label } from "./user.ts";

const ada: User = { name: "Ada", city: "London" };
console.log(label(ada));
