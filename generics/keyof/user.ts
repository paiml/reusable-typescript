// keyof User is the type of User's keys: "city" | "age".
type User = { city: string; age: number };

function field(user: User, key: keyof User) {
  return user[key];
}

const ada: User = { city: "London", age: 36 };
console.log(field(ada, "city"));
console.log(field(ada, "email"));
