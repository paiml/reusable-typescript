// Only types: a type alias, an interface, an assertion and annotations.
type Id = number;
interface User {
  id: Id;
  name: string;
}

const raw: unknown = { id: 1, name: "Ada" };
const user = raw as User;

function label(user: User): string {
  return `${user.name} ${user.id}`;
}

console.log(label(user));
