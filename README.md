# Reusable TypeScript 7 Code

Write TypeScript 7 you can reuse: typed functions, generics, classes and modules, each
checked by the compiler and then run in Node.js.

This repository holds every example from the **Functions, Classes and Modules** video
lessons. Each example is a small, runnable folder: you read the file, run it with
Node.js, check it with the TypeScript compiler, and then confirm what you saw with a
short check program. You see what Node.js runs anyway and what the compiler stops
first. You finish by building a small typed library, split into modules, that runs as
written and ships its own type files.

<details>
  <summary><b>Table of Contents</b></summary>
  <br>

* [What you will learn](#what-you-will-learn)
* [Who this is for](#who-this-is-for)
* [Get set up](#get-set-up)
* [How each lesson works](#how-each-lesson-works)
* [Learning path](#learning-path)
  * [1. Functions](#1-functions)
  * [2. Generics, gently](#2-generics-gently)
  * [3. Classes the Node-friendly way](#3-classes-the-node-friendly-way)
  * [4. Modules](#4-modules)
  * [5. Project: a typed module library](#5-project-a-typed-module-library)
* [Check your progress](#check-your-progress)
* [Troubleshooting](#troubleshooting)
* [Where to go next](#where-to-go-next)

</details>

## What you will learn

By the end of these lessons you will be able to:

* Type a function's parameters and return value, including optional, default and rest
  parameters
* Type callbacks, functions that return nothing, and async functions that return
  promises
* Write generic functions and types, constrain them, and read generic error messages
* Write classes with fields, constructors, private and read-only fields
* Tell which TypeScript syntax Node.js refuses, and make the compiler reject the same
  syntax
* Replace enums with a constant object and a union type made from its values
* Split code into ES modules with full file extensions, and import types on their own
* Build a small typed library that runs as written and ships its own types

> [!NOTE]
> **Diversity Statement:** We share a commitment to diversity and equity, removing
> barriers to learning so that everyone can participate fully. These lessons are meant
> to be useful to people with a wide range of backgrounds, identities, and learning
> styles, whether you found them through a course or on your own on GitHub.

## Who this is for

You can compile and run a TypeScript file from a terminal, and you can read everyday
types such as strings, arrays, objects and unions. Now you want to organize code into
functions, classes and modules that you can reuse.

You will also need to be comfortable running commands in a terminal. Each lesson starts
by moving into the example's folder with `cd`, and runs everything from there.

## Get set up

You need:

* **Node.js 22.18 or later**, which can run `.ts` files directly. The lessons were
  recorded with Node.js 25.1.0.
* **npm**, which comes with Node.js.

Clone the repository and install the pinned packages:

```bash
git clone https://github.com/paiml/reusable-typescript.git
cd reusable-typescript
npm ci        # installs TypeScript 7.0.2, exactly as pinned in package-lock.json
npm test      # runs every check program; all of them should pass
```

TypeScript is pinned to **7.0.2**, so the errors and messages you see match the ones
in the videos.

## How each lesson works

Every lesson has its own folder and follows the same loop:

```bash
cd functions/returns          # 1. Move into the lesson's folder
cat half.ts                   # 2. Read the example
node half.ts                  # 3. Run it: Node.js runs the TypeScript file as it is
npx tsc --noEmit half.ts      # 4. Type-check it (--noEmit: no .js files are written)
node check.ts                 # 5. Confirm the lesson's contract
cd ../..                      # back to the root, ready for the next lesson
```

A few conventions help you find your way:

* **Some files are wrong on purpose.** They contain the mistakes the compiler is meant
  to catch, so you can see what Node.js does with them and what `tsc` reports. Look for
  names like `mistakes.ts`, `mistake.ts`, `wrong.ts`, `forgot.ts`, `untyped.ts` or
  `loose.ts`, and for the working version next to them: `fixed.ts`, `fields.ts` or
  `config.ts`.
* **Some folders have their own `tsconfig.json`.** These lessons are about a compiler
  setting, so you run `npx tsc` with no file name and the settings come from the file.
  There is no `tsconfig.json` at the root on purpose.
* **Every lesson has a check program** (`check.ts` in its folder). It runs the compiler
  and Node.js for you, asserts what should happen (which file passes, which error code
  a broken file produces, what gets printed) and ends with a `contract: … OK` line. If
  anything is different, it stops with an error that tells you what changed.
* **[LESSONS.md](LESSONS.md)** lists every command typed in every video, in order.
  Use it to follow along, or to replay a lesson without the video.

## Learning path

Work through the sections in order: each one builds on the one before it. For every
lesson, the table lists the files to study and the check program that confirms what
you learned.

### 1. Functions

A function's types are a promise to everyone who calls it. Here you write that promise
down and watch the compiler hold both sides to it.

**You will be able to:** type parameters and return values, catch a wrong return and a
missing argument, use optional, default and rest parameters, type a callback, and write
functions that return nothing or return a promise.

| Lesson | Study | Check |
|---|---|---|
| Typing parameters and returns | [`price.ts`](functions/typed/price.ts), [`untyped.ts`](functions/typed/untyped.ts) | [`check.ts`](functions/typed/check.ts) |
| A wrong return type | [`half.ts`](functions/returns/half.ts) → [`fixed.ts`](functions/returns/fixed.ts) | [`check.ts`](functions/returns/check.ts) |
| A missing argument | [`add.ts`](functions/missing/add.ts) | [`check.ts`](functions/missing/check.ts) |
| Optional parameters | [`greet.ts`](functions/optional/greet.ts), [`shout.ts`](functions/optional/shout.ts) | [`check.ts`](functions/optional/check.ts) |
| Default values | [`repeat.ts`](functions/defaults/repeat.ts) | [`check.ts`](functions/defaults/check.ts) |
| Rest parameters | [`sum.ts`](functions/rest/sum.ts) | [`check.ts`](functions/rest/check.ts) |
| Arrow functions | [`prices.ts`](functions/arrows/prices.ts) | [`check.ts`](functions/arrows/check.ts) |
| Typing a callback | [`apply.ts`](functions/callbacks/apply.ts) | [`check.ts`](functions/callbacks/check.ts) |
| Functions that return nothing | [`log.ts`](functions/void/log.ts), [`mistakes.ts`](functions/void/mistakes.ts) | [`check.ts`](functions/void/check.ts) |
| Async functions and promises | [`double.ts`](functions/async/double.ts), [`mistakes.ts`](functions/async/mistakes.ts) | [`check.ts`](functions/async/check.ts) |

**Try it yourself:** at the end of [`functions/callbacks/apply.ts`](functions/callbacks/apply.ts),
add `console.log(applyToAll([1, 2, 3], (value) => value * 3));` and type-check the
file. The new line has no error, even though `value` has no annotation: the `Change`
type tells the compiler it is a number. The only error left is the one for `shout`.

**Read more:** [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
in the TypeScript Handbook.

### 2. Generics, gently

Some functions and types work the same way for any type you give them. Generics let you
write them once and still keep the link between what goes in and what comes out.

**You will be able to:** write a generic function and let the compiler infer its type,
use generic arrays, constrain a type parameter, get an object's keys as a type, write a
generic container type, use the built-in generic types, and read generic error
messages.

| Lesson | Study | Check |
|---|---|---|
| A generic function infers its type | [`first.ts`](generics/first/first.ts), [`mistake.ts`](generics/first/mistake.ts) | [`check.ts`](generics/first/check.ts) |
| Generic arrays | [`lists.ts`](generics/arrays/lists.ts) | [`check.ts`](generics/arrays/check.ts) |
| Constraining a generic type | [`size.ts`](generics/extends/size.ts), [`longest.ts`](generics/extends/longest.ts) | [`check.ts`](generics/extends/check.ts) |
| A constraint error | [`longest.ts`](generics/wrong-arg/longest.ts) | [`check.ts`](generics/wrong-arg/check.ts) |
| Getting an object's keys as a type | [`user.ts`](generics/keyof/user.ts) | [`check.ts`](generics/keyof/check.ts) |
| A generic container type | [`box.ts`](generics/box/box.ts) | [`check.ts`](generics/box/check.ts) |
| Built-in generic types: arrays, promises and records | [`built-in.ts`](generics/built-in/built-in.ts), [`forgot-await.ts`](generics/built-in/forgot-await.ts) | [`check.ts`](generics/built-in/check.ts) |
| Reading generic error messages | [`totals.ts`](generics/messages/totals.ts) | [`check.ts`](generics/messages/check.ts) |

**Try it yourself:** in [`generics/box/box.ts`](generics/box/box.ts), the `wrong` box
is a `Box<number>` holding the string `"1.70"`. Change the value to the number `1.70`
and type-check the file again until it reports no errors.

**Read more:** [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
in the TypeScript Handbook.

### 3. Classes the Node-friendly way

Node.js runs TypeScript by removing the types and leaving the JavaScript. This section
writes classes from syntax it can run as written, and shows what to use for the few
pieces of TypeScript syntax it refuses.

**You will be able to:** write fields, constructors and methods, choose between
`private` and `#private`, use read-only fields, explain what Node.js removes from a file,
make the compiler reject parameter properties and enums with `erasableSyntaxOnly`, and
replace an enum with a constant object and a union of its values.

| Lesson | Study | Check |
|---|---|---|
| Fields and constructors | [`counter.ts`](classes/fields/counter.ts), [`forgot.ts`](classes/fields/forgot.ts) | [`check.ts`](classes/fields/check.ts) |
| Private fields in TypeScript and JavaScript | [`account.ts`](classes/private/account.ts), [`wallet.ts`](classes/private/wallet.ts) | [`check.ts`](classes/private/check.ts) |
| Read-only fields | [`ticket.ts`](classes/readonly/ticket.ts) | [`check.ts`](classes/readonly/check.ts) |
| What Node removes when it runs TypeScript | [`erase.ts`](classes/strip/erase.ts), [`lines.ts`](classes/strip/lines.ts) | [`check.ts`](classes/strip/check.ts) |
| Parameter properties and why Node refuses them | [`point.ts`](classes/shorthand/point.ts) → [`fields.ts`](classes/shorthand/fields.ts) | [`check.ts`](classes/shorthand/check.ts) |
| Making the compiler reject the same syntax | [`tsconfig.json`](classes/erasable/tsconfig.json), [`point.ts`](classes/erasable/point.ts) | [`check.ts`](classes/erasable/check.ts) |
| Enums and why Node refuses them | [`status.ts`](classes/enum/status.ts) | [`check.ts`](classes/enum/check.ts) |
| A constant object instead | [`status.ts`](classes/constants/status.ts) | [`check.ts`](classes/constants/check.ts) |
| A union type from an object's values | [`status.ts`](classes/union/status.ts) | [`check.ts`](classes/union/check.ts) |

**Try it yourself:** in [`classes/union/status.ts`](classes/union/status.ts), add
`Archived: "archived"` to the `Status` object and type-check the file again. The error
on `describe("archived")` goes away, because the `Status` type is made from the
object's values and now includes `"archived"`.

**Read more:** [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
in the TypeScript Handbook, [`erasableSyntaxOnly`](https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly)
in the TSConfig reference, and [Modules: TypeScript](https://nodejs.org/api/typescript.html)
in the Node.js documentation.

### 4. Modules

Once code is worth reusing, it moves into its own file. This section splits code across
files with ES modules and sets up the compiler to match how Node.js loads them.

**You will be able to:** export and import between files, write imports with their full
file extension, rewrite `.ts` imports to `.js` when the compiler builds, import types on
their own, keep imports exactly as written with `verbatimModuleSyntax`, and catch a typo
in a configuration object with `satisfies`.

| Lesson | Study | Check |
|---|---|---|
| Importing and exporting | [`math.ts`](modules/imports/math.ts), [`main.ts`](modules/imports/main.ts), [`wrong.ts`](modules/imports/wrong.ts) | [`check.ts`](modules/imports/check.ts) |
| File extensions in Node module imports | [`main.ts`](modules/extensions/main.ts) → [`fixed.ts`](modules/extensions/fixed.ts), [`tsconfig.json`](modules/extensions/tsconfig.json) | [`check.ts`](modules/extensions/check.ts) |
| Importing TypeScript files and rewriting them to JavaScript | [`src/`](modules/rewrite/src), [`tsconfig.json`](modules/rewrite/tsconfig.json) | [`check.ts`](modules/rewrite/check.ts) |
| Importing only types | [`user.ts`](modules/type-only/user.ts), [`main.ts`](modules/type-only/main.ts), [`wrong.ts`](modules/type-only/wrong.ts) | [`check.ts`](modules/type-only/check.ts) |
| Keeping imports exactly as written | [`wrong.ts`](modules/verbatim/wrong.ts), [`tsconfig.json`](modules/verbatim/tsconfig.json) | [`check.ts`](modules/verbatim/check.ts) |
| Catching a typo in a configuration object | [`loose.ts`](modules/satisfies/loose.ts) → [`config.ts`](modules/satisfies/config.ts) | [`check.ts`](modules/satisfies/check.ts) |

**Read more:** [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
in the TypeScript Handbook, and [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax)
and [`rewriteRelativeImportExtensions`](https://www.typescriptlang.org/tsconfig/#rewriteRelativeImportExtensions)
in the TSConfig reference.

### 5. Project: a typed module library

Bring everything together in a small shopping-cart library, split into modules, that
Node.js runs as written and `tsc` checks and builds. Start with the brief in
[`library/BRIEF.md`](library/BRIEF.md).

**You will be able to:** split a library into modules behind one front door, use typed
functions, a generic helper, a class with read-only and `#private` fields, and a constant
object in place of an enum, and build a `.js` and a `.d.ts` file for every module.

| Lesson | Study | Check |
|---|---|---|
| Project brief | [`BRIEF.md`](library/BRIEF.md), [`receipt.ts`](library/src/receipt.ts) | [`check.ts`](library/check.ts) |
| Splitting it into modules | [`index.ts`](library/src/index.ts), [`cart.ts`](library/src/cart.ts), [`tsconfig.json`](library/tsconfig.json) | [`check.ts`](library/check.ts) |
| The contract line | [`check.ts`](library/check.ts) | [`check.ts`](library/check.ts) |

Unlike most of the single-file examples, the library is a project. Check and build it
with its [`tsconfig.json`](library/tsconfig.json) instead of naming a file:

```bash
cd library
node src/receipt.ts      # runs from source: total: EUR 9.75
npx tsc                  # checks it and builds dist/: a .js and a .d.ts per module
node dist/receipt.js     # the built JavaScript prints the same total
```

**Try it yourself:** add `Pound: "GBP"` to `Currency` in
[`library/src/currency.ts`](library/src/currency.ts). Then, in
[`library/src/receipt.ts`](library/src/receipt.ts), make a second cart with
`new Cart(Currency.Pound)`, add an item to it and print its total. Run it from source,
build it with `npx tsc`, and run `node dist/receipt.js` to see both totals.

## Check your progress

Run every check program at once, from the root of the repository:

```bash
npm test
```

Each check program must print its `contract: … OK` line for the test to pass. If you
have been experimenting with the examples, a failing check tells you exactly which
file no longer behaves the way the lesson describes. Use `git diff` to see what you
changed and `git checkout -- <file>` to put a file back.

Both helpers that the check programs use, one that runs `npx tsc` and one that runs
`node` on a file, live in [`support/run.ts`](support/run.ts).

## Troubleshooting

* **`node` refuses to run a `.ts` file:** your Node.js is older than 22.18. Check with
  `node --version` and upgrade.
* **`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` from Node.js:** the file uses an enum or a
  parameter property, which Node.js can't remove. That is expected in
  `classes/shorthand` and `classes/enum`; anywhere else, write the fields out or use a
  constant object.
* **`error TS5112: tsconfig.json is present but will not be loaded…`:** you named a
  file in a folder that has its own `tsconfig.json`. Run `npx tsc` with no file name
  there.
* **`.js` files appeared next to the examples:** you ran `npx tsc <file>` without
  `--noEmit`. `git status` lists them as new files, and they are safe to delete.
* **A `dist/` folder appeared:** `npx tsc` built it in `modules/rewrite` or `library`.
  It is ignored by git and is built again every time.
* **Your error messages look different from the videos:** run `npm ci` so you have
  TypeScript 7.0.2 from `package-lock.json`, and call it through `npx tsc` rather than
  a globally installed `tsc`.

## Where to go next

Keep learning with more courses from Pragmatic AI Labs, on whichever platform you
prefer:

* [**Pragmatic AI Labs platform**](https://ds500.paiml.com): the full catalog of
  courses and hands-on programs
* [**Pragmatic AI Labs on Coursera**](https://www.coursera.org/partners/pragmatic-ai-labs)
* [**Pragmatic AI Labs on edX**](https://www.edx.org/school/ai)

Then put what you learned here into practice:

* Take a JavaScript file you have already written and give each function typed
  parameters and a typed return, one function at a time, checking with
  `npx tsc --noEmit` as you go.
* Find a function you wrote twice for two different types, and write it once as a
  generic.
* Turn on [`erasableSyntaxOnly`](https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly)
  in a project of your own, so the compiler stops what Node.js would refuse.
* Keep reading the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html):
  type manipulation builds directly on the generics you learned here.
