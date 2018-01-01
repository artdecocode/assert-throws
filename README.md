# assert-throws

`assert-throws` is an assertion method for Node.js which checks if a synchronous
or asynchronous function throws. It can also compare properties of the error
with expected ones.

```sh
npm i --save-dev assert-throws
```

## ES5

The package uses some newer language features. For your convenience, it's been
transpiled to be compatible with Node 4. You can use the following snippet.

```js
const assertThrows = require('assert-throws/es5/src')
```

## API

The package exports a single function as its API.

## `assertThrows({ fn: function, message?: string, code?: string, context?, args?: any[] })`

Use `assertThrows` by passing to it an object with `fn` property as a minimum.

```js
const assertThrows = require('assert-throws');

(async () => {
    await assertThrows({
        async fn() {
            throw new Error('test-error')
        },
    })
})()
```

The function will throw if the passed function does not throw.

```js
const assertThrows = require('assert-throws');

(async () => {
    try {
        await assertThrows({
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
const assertThrows = require('assert-throws');

(async () => {
    await assertThrows({
        async fn() {
            throw new Error('test-error')
        },
        message: 'test-error'
    })
})()
```

The assertion function will throw when messages don't equal.

```js
const assertThrows = require('assert-throws');

(async () => {
    await assertThrows({
        async fn() {
                throw new Error('test-error')
            },
            message: 'error-test',
        })
    } catch (err) {
        console.log(err) // Error: test-error != error-test
    }
})()
```

### Code

Same works for the `code` property:

```js
const assertThrows = require('assert-throws');

(async () => {
    await assertThrows({
        async fn() {
            const error = new Error('test-error')
            error.code = 'ENOENT'
            throw error
        },
        code: 'ENOENT',
    })
})()
```

## Context

It is possible to pass a context to the function:

```js
await assertThrows({
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
await assertThrows({
    async fn(test) {
        throw new Error(test)
    },
    message: 'context-assert-error',
    args: ['test-error-message'],
})
```

---

(c) [sobes.io][1] 2017

[1]: https://sobes.io
