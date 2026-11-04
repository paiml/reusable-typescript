// The currencies a cart can use: a constant object, and a union of its values.
export const Currency = {
  Dollar: "USD",
  Euro: "EUR",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];
