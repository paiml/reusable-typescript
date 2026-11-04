// Imports the type User as if it were a value.
import { User, label } from "./user.ts";

const ada: User = { name: "Ada", city: "London" };
console.log(label(ada));
