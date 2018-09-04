# assert-throws

[![npm version](https://badge.fury.io/js/assert-throws.svg)](https://npmjs.org/package/assert-throws)

`assert-throws` is an assertion method for Node.js which checks if a synchronous or asynchronous function throws. It can also compare properties of the error (such as `message`, `code` and `stack` and any other) with expected ones using string strict equality, a regular expression, or a function.

```
yarn add -E assert-throws
```

## Table of Contents

- [Table of Contents](#table-of-contents)
- [API](#api)
  * [`async throws(config: Config): Error`](#async-throwsconfig-fn-functionargs-anyanycontext-anymessage-assertioncode-assertionerror-assertionprop-assertion-error)
    * [`Assertion`](#assertion)
    * [`Config`](#config)
  * [Arguments](#arguments)
  * [Context](#context)
  * [Message](#message)
    * [string equality](#string-equality)
    * [regular expression](#regular-expression)
  * [Code](#code)
    * [string equality](#string-equality)
    * [regular expression](#regular-expression)
  * [Stack](#stack)
    * [string equality](#string-equality)
    * [regular expression](#regular-expression)
  * [Strict Equality](#strict-equality)
- [TODO](#todo)
- [Copyright](#copyright)

## API

The package exports the default `throws` function.

```js
import throws from 'assert-throws'
```

### `async throws(`<br/>&nbsp;&nbsp;`config: {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`fn: function,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`args?: any|any[],`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`context?: any,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`message?: Assertion,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`code?: Assertion,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`error?: Assertion,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`[prop]?: Assertion,`<br/>&nbsp;&nbsp;`},`<br/>`): Error`

Checks if a function throws an error. As a minimum, the function should be passed in the `fn` property. If the assertion passes, the method returns the error which was thrown by the tested function.

`string|RegExp|function` __<a name="assertion">`Assertion`</a>__: An assertion to perform.

__<a name="config">`Config`</a>__: Parameters to the `assert-throws` method.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| __fn*__ | _function_ | Function to test, either sync or async. | - |
| args | _any\|any[]_ | Arguments to pass to the function. | - |
| context | _any_ | The context in which to execute the function. Global context will be set by default. | - |
| message | [_Assertion_](#assertion) | A string, regex, or function to test the message. | - |
| code | [_Assertion_](#assertion) | A string, regex, or function to test the code. | - |
| stack | [_Assertion_](#assertion) | A string, regex, or function to test the stack. | - |
| prop | [_Assertion_](#assertion) | A string, regex, or function to test any other property of the error. | - |
| error | _Error_ | An error to perform strict comparison against. | - |

```js
import throws from 'assert-throws'

(async function example() {
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
Error: Function should have thrown.
    at example (/Users/zavr/adc/assert-throws/example/throws-fail.js:5:11)
    at Object.<anonymous> (/Users/zavr/adc/assert-throws/example/throws-fail.js:13:3)
```

### Arguments

To pass arguments to the tested function, the `args` properties can be used.

```js
const fn = async (message, shouldThrow = true) => {
  if (shouldThrow) throw new Error(message)
}

try {
  // 1. TEST that a function with arguments throws (pass).
  await throws({
    fn,
    args: ['An argument in the array'],
  })

  // 2. TEST that a function with an argument throws (pass).
  await throws({
    fn,
    args: 'A single argument',
  })

  // 3. TEST that a function with arguments throws (fail).
  await throws({
    fn,
    args: ['An error occurred.', false],
  })
} catch ({ stack }) {
  console.log(stack)
}
```

```
Error: Function should have thrown.
    at example (/Users/zavr/adc/assert-throws/example/args.js:23:11)
    at <anonymous>
```

### Context

To pass context to the function, the `context` properties can be set.

```js
import throws from 'assert-throws'

(async function example() {
  function fn () {
    if (this.shouldThrow) throw new Error('An error occurred.')
  }
  try {
    await throws({
      fn,
      context: { shouldThrow: true },
    }) // pass

    await throws({
      fn,
      context: {},
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Function should have thrown.
    at example (/Users/zavr/adc/assert-throws/example/context.js:13:11)
    at <anonymous>
```

### Message

A `message` property can be set to assert on the <a name="string-equality">string equality</a> of the error message.

```js
import throws from 'assert-throws'

(async function example() {
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
    at example (/Users/zavr/adc/assert-throws/example/message.js:13:11)
    at <anonymous>
```

The `message` can be a <a name="regular-expression">regular expression</a>:

```js
import throws from 'assert-throws'

(async function example() {
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
    at example (/Users/zavr/adc/assert-throws/example/message-regexp.js:13:11)
    at <anonymous>
```

### Code

It is also possible to assert on <a name="string-equality">string equality</a> of the `code` property.

```js
import throws from 'assert-throws'

(async function example() {
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
    at example (/Users/zavr/adc/assert-throws/example/code.js:5:11)
    at Object.<anonymous> (/Users/zavr/adc/assert-throws/example/code.js:25:3)
```

The `code` can be a <a name="regular-expression">regular expression</a>:

```js
import throws from 'assert-throws'

(async function example() {
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
Error: ENOENT does not match regular expression /EXAMPL/
    at example (/Users/zavr/adc/assert-throws/example/code-regexp.js:14:11)
    at <anonymous>
```

### Stack

The `stack` property of an error can also be tested with a <a name="string-equality">string equality</a>.

```js
import throws from 'assert-throws'

(async function example() {
  const stack = `Error: test-error-message
    at example (Users/adc/example/stack.js)`
  const stack2 = `Error: example-error-message
    at test (Users/adc/example/stack.js)`
  try {
    await throws({
      async fn() {
        const err = new Error('test')
        err.stack = stack
        throw err
      },
      stack,
    }) // pass

    await throws({
      async fn() {
        const err = new Error('test')
        err.stack = stack2
        throw err
      },
      stack,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: [90mError: [0m[32mt[0m[90me[0m[31mxample[0m[32mst[0m[90m-error-message
    at [0m[31mt[0m[90me[0m[31mst[0m[32mxample[0m[90m (Users/adc/example/stack.js)[0m
Error: example-error-message
    at test (Users/adc/example/stack.js) != Error: test-error-message
    at example (Users/adc/example/stack.js)
    at example (/Users/zavr/adc/assert-throws/example/stack.js:18:11)
    at <anonymous>
```

The `stack` can be a <a name="regular-expression">regular expression</a>:

```js
import throws from 'assert-throws'

(async function example() {
  const stack = `Error: test-error-message
    at example (Users/adc/example/stack.js)`
  try {
    await throws({
      async fn() {
        const err = new Error('test')
        err.stack = stack
        throw err
      },
      stack: /at example/,
    }) // pass

    await throws({
      async fn() {
        const err = new Error('test')
        err.stack = stack
        throw err
      },
      stack: /at test/,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Error: test-error-message
    at example (Users/adc/example/stack.js) does not match regular expression /at test/
    at example (/Users/zavr/adc/assert-throws/example/stack-regexp.js:16:11)
    at <anonymous>
```

### Strict Equality

`assert-throws` allows to assert on a strict equality of an error.

```js
import throws from 'assert-throws'

(async function example() {
  const error = new Error('test-error')
  try {
    await throws({
      async fn() {
        throw error
      },
      error,
    }) // pass

    await throws({
      async fn() {
        throw new Error('example-error')
      },
      error,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Error: example-error is not strict equal to Error: test-error.
    at example (/Users/zavr/adc/assert-throws/example/strict.js:13:11)
    at <anonymous>
```

## TODO

- [ ] Test error stack assertions.

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz