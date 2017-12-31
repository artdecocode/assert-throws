# assert-throws

`assert-throws` is an assertion method for Node.js which checks if a synchronous
or asynchronous function throws. It can also compare properties of the error
with expected ones.

## `assertThrows({ fn: function, message?: string })`

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

---

(c) [sobes.io][1] 2017

[1]: https://sobes.io
