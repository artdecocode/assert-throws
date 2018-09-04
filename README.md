# assert-throws

[![npm version](https://badge.fury.io/js/assert-throws.svg)](https://npmjs.org/package/assert-throws)

`assert-throws` is an assertion method for Node.js which checks if a synchronous or asynchronous function throws. It can also compare properties of the error (such as `message`, `code` and `stack`) with expected ones using string matching or regular expressions.

```
yarn add -E assert-throws
```

## Table of Contents

- [Table of Contents](#table-of-contents)
- [API](#api)
  * [`async throws(fn: function, args?: any[], message?: string|RegExp, code?: string, error?: Error, context?: any): Error`](#async-throwsfn-functionargs-anymessage-stringregexpcode-stringerror-errorcontext-any-error)
  * [Message](#message)
    * [string equality](#string-equality)
    * [regular expression](#regular-expression)
  * [Code](#code)
    * [string equality](#string-equality)
    * [regular expression](#regular-expression)
- [Copyright](#copyright)

## API

The package exports the default `throws` function.

```js
import throws from 'assert-throws'
```

### `async throws(`<br/>&nbsp;&nbsp;`fn: function,`<br/>&nbsp;&nbsp;`args?: any[],`<br/>&nbsp;&nbsp;`message?: string|RegExp,`<br/>&nbsp;&nbsp;`code?: string,`<br/>&nbsp;&nbsp;`error?: Error,`<br/>&nbsp;&nbsp;`context?: any,`<br/>`): Error`

Checks if a function throws an error. As a minimum, the function should be passed in the `fn` property.

```js
import throws from 'assert-throws'

(async () => {
  try {
    await throws({
      async fn() {
        // this function does not throw
      },
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Function should have thrown
    at /Users/zavr/adc/assert-throws/example/throws-fail.js:5:11
    at Object.<anonymous> (/Users/zavr/adc/assert-throws/example/throws-fail.js:13:3)
```

### Message

A `message` property can be set to assert on the <a name="string-equality">string equality</a> of the error message.

```js
import throws from 'assert-throws'

(async () => {
  const message = 'test-error-message'
  try {
    await throws({
      async fn() {
        throw new Error(message)
      },
      message,
    }) // pass

    await throws({
      async fn() {
        throw new Error('example-error-message')
      },
      message,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: [32mt[0m[90me[0m[31mxample[0m[32mst[0m[90m-error-message[0m
example-error-message != test-error-message
    at /Users/zavr/adc/assert-throws/example/message.js:13:11
    at <anonymous>
```

The `message` can be a <a name="regular-expression">regular expression</a>:

```js
import throws from 'assert-throws'

(async () => {
  const message = 'test-error-message'
  try {
    await throws({
      async fn() {
        throw new Error(message)
      },
      message: /test/,
    }) // pass

    await throws({
      async fn() {
        throw new Error(message)
      },
      message: /example/,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: test-error-message does not match regular expression /example/
    at /Users/zavr/adc/assert-throws/example/message-regexp.js:13:11
    at <anonymous>
```

### Code

It is also possible to assert on <a name="string-equality">string equality</a> of the `code` property.

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
      code: 'TNEONE',
    }) // pass

    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: 'TNEONE',
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: [32mTN[0m[90mE[0m[32mO[0m[90mN[0m[31mO[0m[90mE[0m[31mNT[0m
ENOENT != TNEONE
    at /Users/zavr/adc/assert-throws/example/code.js:5:11
    at Object.<anonymous> (/Users/zavr/adc/assert-throws/example/code.js:25:3)
```

The `code` can be a <a name="regular-expression">regular expression</a>:

```js
import throws from 'assert-throws'

(async () => {
  try {
    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOTEST'
        throw error
      },
      code: /TEST/,
    }) // pass

    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: /EXAMPL/,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: value.split is not a function
    at /Users/zavr/adc/assert-throws/example/code-regexp.js:5:11
    at Object.<anonymous> (/Users/zavr/adc/assert-throws/example/code-regexp.js:25:3)
```

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz