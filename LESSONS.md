# The commands from each lesson

Every command typed in the lesson videos, in order. Run them from the root of
this repository, after the setup in README.md.

## 1.1.1 Typing parameters and returns

```bash
cd functions/typed
cat price.ts
node price.ts
npx tsc --noEmit price.ts
npx tsc --noEmit untyped.ts
node check.ts
```

## 1.1.2 A wrong return type

```bash
cd functions/returns
cat half.ts
node half.ts
npx tsc --noEmit half.ts
node check.ts
```

## 1.1.3 A missing argument

```bash
cd functions/missing
cat add.ts
node add.ts
npx tsc --noEmit add.ts
node check.ts
```

## 1.2.1 Optional parameters

```bash
cd functions/optional
cat greet.ts
node greet.ts
cat shout.ts
node shout.ts
npx tsc --noEmit shout.ts
node check.ts
```

## 1.2.2 Default values

```bash
cd functions/defaults
cat repeat.ts
node repeat.ts
npx tsc --noEmit repeat.ts
node check.ts
```

## 1.2.3 Rest parameters

```bash
cd functions/rest
cat sum.ts
node sum.ts
npx tsc --noEmit sum.ts
node check.ts
```

## 1.3.1 Arrow functions

```bash
cd functions/arrows
cat prices.ts
node prices.ts
npx tsc --noEmit prices.ts
node check.ts
```

## 1.3.2 Typing a callback

```bash
cd functions/callbacks
cat apply.ts
node apply.ts
npx tsc --noEmit apply.ts
node check.ts
```

## 1.3.3 Functions that return nothing

```bash
cd functions/void
cat log.ts
node log.ts
cat mistakes.ts
npx tsc --noEmit mistakes.ts
node check.ts
```

## 1.3.4 Async functions and promises

```bash
cd functions/async
cat double.ts
node double.ts
cat mistakes.ts
npx tsc --noEmit mistakes.ts
node check.ts
```

## 2.1.2 A generic function infers its type

```bash
cd generics/first
cat first.ts
node first.ts
npx tsc --noEmit first.ts
npx tsc --noEmit mistake.ts
node check.ts
```

## 2.1.3 Generic arrays

```bash
cd generics/arrays
cat lists.ts
node lists.ts
npx tsc --noEmit lists.ts
node check.ts
```

## 2.2.1 Constraining a generic type

```bash
cd generics/extends
cat size.ts
npx tsc --noEmit size.ts
cat longest.ts
node longest.ts
npx tsc --noEmit longest.ts
node check.ts
```

## 2.2.2 A constraint error

```bash
cd generics/wrong-arg
cat longest.ts
node longest.ts
npx tsc --noEmit longest.ts
node check.ts
```

## 2.2.3 Getting an object's keys as a type

```bash
cd generics/keyof
cat user.ts
node user.ts
npx tsc --noEmit user.ts
node check.ts
```

## 2.3.1 A generic container type

```bash
cd generics/box
cat box.ts
node box.ts
npx tsc --noEmit box.ts
node check.ts
```

## 2.3.2 Built-in generic types: arrays, promises and records

```bash
cd generics/built-in
cat built-in.ts
node built-in.ts
cat forgot-await.ts
node forgot-await.ts
npx tsc --noEmit forgot-await.ts
node check.ts
```

## 2.3.3 Reading generic error messages

```bash
cd generics/messages
cat totals.ts
npx tsc --noEmit totals.ts
node check.ts
```

## 3.1.1 Fields and constructors

```bash
cd classes/fields
cat counter.ts
node counter.ts
cat forgot.ts
node forgot.ts
npx tsc --noEmit forgot.ts
node check.ts
```

## 3.1.2 Private fields in TypeScript and JavaScript

```bash
cd classes/private
cat account.ts
node account.ts
npx tsc --noEmit account.ts
cat wallet.ts
node wallet.ts
npx tsc --noEmit wallet.ts
node check.ts
```

## 3.1.3 Read-only fields

```bash
cd classes/readonly
cat ticket.ts
node ticket.ts
npx tsc --noEmit ticket.ts
node check.ts
```

## 3.2.1 What Node removes when it runs TypeScript

```bash
cd classes/strip
cat erase.ts
node erase.ts
cat lines.ts
node lines.ts
grep -n boom lines.ts
node check.ts
```

## 3.2.2 Parameter properties and why Node refuses them

```bash
cd classes/shorthand
cat point.ts
node point.ts
cat fields.ts
node fields.ts
node check.ts
```

## 3.2.3 Making the compiler reject the same syntax

```bash
cd classes/erasable
cat tsconfig.json
npx tsc
npx tsc --erasableSyntaxOnly false
node check.ts
```

## 3.3.1 Enums and why Node refuses them

```bash
cd classes/enum
cat status.ts
node status.ts
npx tsc --noEmit status.ts
npx tsc --noEmit --erasableSyntaxOnly status.ts
node check.ts
```

## 3.3.2 A constant object instead

```bash
cd classes/constants
cat status.ts
node status.ts
npx tsc --noEmit status.ts
node check.ts
```

## 3.3.3 A union type from an object's values

```bash
cd classes/union
cat status.ts
node status.ts
npx tsc --noEmit status.ts
node check.ts
```

## 4.1.1 Importing and exporting

```bash
cd modules/imports
cat math.ts
cat main.ts
node main.ts
node wrong.ts
npx tsc
node check.ts
```

## 4.1.2 File extensions in Node module imports

```bash
cd modules/extensions
cat main.ts
node main.ts
cat tsconfig.json
npx tsc
node fixed.ts
node check.ts
```

## 4.1.3 Importing TypeScript files and rewriting them to JavaScript

```bash
cd modules/rewrite
node src/main.ts
cat tsconfig.json
npx tsc
ls dist
cat dist/main.js
node dist/main.js
node check.ts
```

## 4.2.1 Importing only types

```bash
cd modules/type-only
cat user.ts
cat main.ts
node main.ts
node wrong.ts
node check.ts
```

## 4.2.2 Keeping imports exactly as written

```bash
cd modules/verbatim
cat wrong.ts
cat tsconfig.json
npx tsc
npx tsc --verbatimModuleSyntax false
node check.ts
```

## 4.2.3 Catching a typo in a configuration object

```bash
cd modules/satisfies
cat loose.ts
npx tsc --noEmit loose.ts
cat config.ts
npx tsc --noEmit config.ts
node check.ts
```

## 4.3.1 Project brief

```bash
cd library
head -9 BRIEF.md
tail -7 BRIEF.md
ls src
node src/receipt.ts
node check.ts
```

## 4.3.2 Splitting it into modules

```bash
cd library
cat src/index.ts
grep -n import src/cart.ts
cat tsconfig.json
npx tsc
ls dist
node dist/receipt.js
node check.ts
```

## 4.3.3 The contract line

```bash
cd library
grep -n Step check.ts
node check.ts
```
