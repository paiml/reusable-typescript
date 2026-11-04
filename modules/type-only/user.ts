// A type, and a function that uses it.
export type User = { name: string; city: string };

export function label(user: User): string {
  return `${user.name} from ${user.city}`;
}
