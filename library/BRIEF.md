# A typed module library

A small shopping-cart library, split into modules, that Node runs as written
and tsc checks and builds.

What it does:

- `Cart` holds items in one currency and prints its total, like `EUR 9.75`.
- `Currency` lists the currencies a cart accepts: `USD` and `EUR`.

The rules:

1. Every function has typed parameters and a typed return.
2. Node runs every file as written: no enums, no parameter properties.
3. Imports name the `.ts` file, and types come in with `import type`.
4. `tsc` builds `dist/`: a `.js` and a `.d.ts` file for every module.
5. `check.ts` proves all of it, and ends with its contract line.
