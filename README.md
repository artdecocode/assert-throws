# assert-throws

[![npm version](https://badge.fury.io/js/assert-throws.svg)](https://badge.fury.io/js/assert-throws)

`assert-throws` is an assertion method for Node.js which checks if a synchronous
or asynchronous function throws. It can also compare properties of the error
with expected ones.

```sh
yarn add -D -E assert-throws
```

## API

The package exports a single function as its API.

## `throws({ fn: function, message?: string|RegExp, code?: string, error?: Error context?, args?: any[] }): Promise.<Error>`

Use `throws` by passing to it an object with `fn` property as a minimum.
The function will return the thrown error.

```js
import throws from 'assert-throws'

(async () => {
  await throws({
    async fn() {
      throw new Error('test-error')
    },
  })
})()
```

The function will throw if the passed function does not throw.

```js
import throws from 'assert-throws'

(async () => {
  try {
    await throws({
      async fn() { },
    })
  } catch (err) {
    console.log(err) // Error: Function should have thrown
  }
})()
```

### Message

You can pass `message` property to assert on equality of the error message:

```js
import throws from 'assert-throws'

(async () => {
  await throws({
    async fn() {
      throw new Error('test-error')
    },
    message: 'test-error',
  })
})()
```

The `message` can be a regular expression:

```js
import throws from 'assert-throws'

(async () => {
  await throws({
    async fn() {
      throw new Error('test-error')
    },
    message: /test/,
  })
})()
```

The assertion function will throw when messages don't equal, and display using shell colours the difference between the two strings using [erte](https://artdeco.bz/erte) package.

```js
import throws from 'assert-throws'

(async () => {
  try {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      message: 'error-test',
    })
  } catch (err) {
    console.log(err) // Error: (color-diff) test-error != error-test
  }
})()
```

### Code

Same works for the `code` property:

```js
import throws from 'assert-throws'

(async () => {
  try {
    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: 'TNEONE', // Error: (color-diff) ENOENT != TNEONE
    })
  } catch (err) {
    console.log(err) // Error: (color-diff) ENOENT != TNEONE
  }
})()
```

### Strict equality

One can assert on a strict equality of an error.

```js
import throws from 'assert-throws'

(async () => {
  const error = new Error('test-error')
  await throws({
    async fn() {
      throw error
    },
    error,
  })

  try {
    await throws({
      async fn() {
        throw error
      },
      error: new Error('test-error-fail'),
    })
  } catch (err) {
    console.log(err) // test-error is not strict equal to Error: test-error-fail.
  }
})()
```

## Context

It is possible to pass a context to the function:

```js
await throws({
  async fn() {
      throw new Error(this.test)
  },
  message: 'context-assert-error',
  context: { test: 'test-error-message' },
})
```

## Arguments

It is possible to pass arguments to the function:

```js
await throws({
  async fn(message, code) {
    const error = new Error(message)
    error.code = code
    throw error
  },
  message: 'context-assert-error',
  args: ['test-error-message', 'CONTEXT_ASSERT'],
})
```

## ES5

> DO NOT USE THIS. USE NEWER NODE.JS
The package uses some newer language features. For your convenience, it's been
transpiled to be compatible with Node 4. You can use the following snippet.

```js
const throws = require('assert-throws/es5')
```

This does have such features as highlighting the difference of messages and codes and `erotic` call stacks.

---

(c) [Art Deco Code][1] 2018

[1]: https://adc.sh
