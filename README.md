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
- [Assertions](#assertions)
  * [String Equality](#string-equality)
  * [RegExp Test](#regexp-test)
  * [Function Evaluation](#function-evaluation)
  * [Multiple Assertions](#multiple-assertions)
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

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('test-error')
}

(async function example() {
  // 1. TEST a throwing function.
  await throws({
    fn: testThrows,
  })

  // 2. TEST a throwing function (alternative syntax).
  await throws({
    async fn(){
      await testThrows()
    },
  })

  console.log('Everything passed.')
})()
```

```
Everything passed.
```

```js
import throws from 'assert-throws'

const testThrows = async () => {
  await new Promise(r => setTimeout(r, 100))
}

(async function example() {
  try {
    await throws({
      fn: testThrows,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Function testThrows should have thrown.
    at example (/Users/zavr/adc/assert-throws/example/throws-fail.js:9:11)
    at Object.<anonymous> (/Users/zavr/adc/assert-throws/example/throws-fail.js:15:3)
```

### Arguments

To pass arguments to the tested function, the `args` properties can be used.

```js
import throws from 'assert-throws'

const testThrows = async (message, shouldThrow = true) => {
  if (shouldThrow) throw new Error(message)
}

(async function example() {
  try {
    // 1. TEST that a function with arguments throws (pass).
    await throws({
      fn: testThrows,
      args: ['An argument in the array'],
    })

    // 2. TEST that a function with an argument throws (pass).
    await throws({
      fn: testThrows,
      args: 'A single argument',
    })

    // 2. TEST that a function with arguments throws (alternative) (pass).
    await throws({
      async fn() {
        await testThrows('A single argument')
      },
    })

    // 3. TEST that a function with arguments throws (fail).
    await throws({
      fn: testThrows,
      args: ['An error occurred.', false],
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Function testThrows should have thrown.
    at example (/Users/zavr/adc/assert-throws/example/args.js:29:11)
    at <anonymous>
```

### Context

To pass a context to the function, the `context` properties can be set. Otherwise, it will use the global context, unless it was bound.

```js
import throws from 'assert-throws'

async function testThrows() {
  if (this.shouldThrow) throw new Error('An error occurred.')
}

(async function example() {
  try {
    // 1. TEST a function with context (pass).
    await throws({
      fn: testThrows,
      context: { shouldThrow: true },
    })

    // 2.  TEST a function with a context (fail).
    await throws({
      fn: testThrows,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Function testThrows should have thrown.
    at example (/Users/zavr/adc/assert-throws/example/context.js:16:11)
    at <anonymous>
```

## Assertions

If a function throws, any of the error properties can be tested. Every property specified in the configuration will test a property of the error, e.g., `message`, `code` and others.

### String Equality

It is possible to check that any property of a thrown error is equal to a given string.

```js
import throws from 'assert-throws'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('test-error')
}

(async function example() {
  try {
    // 1. TEST that a function throws with a string (pass).
    await throws({
      fn: testThrows,
      message: 'test-error',
    })

    // 2. TEST that a function throws with a string (fail).
    await throws({
      fn: testThrows,
      message: 'wrong-error',
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: [31mtest[0m[32mwrong[0m[90m-error[0m
test-error != wrong-error
    at example (/Users/zavr/adc/assert-throws/example/string.js:17:11)
    at <anonymous>
```



### RegExp Test

Moreover, a regular expression can be used to validate an error's property.

```js
import throws from 'assert-throws'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  const error = new Error('test-error')
  error.code = 'ENOENT'
  throw error
}

(async function example() {
  try {
    // 1. TEST that a function throws with a regexp (pass).
    await throws({
      fn: testThrows,
      code: /enoent/i,
    })

    // 2. TEST that a function throws with a regexp (fail).
    await throws({
      fn: testThrows,
      code: /ENOEXMPL/,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: ENOENT does not match regular expression /ENOEXMPL/
    at example (/Users/zavr/adc/assert-throws/example/regexp.js:19:11)
    at <anonymous>
```



### Function Evaluation

For more advanced usage, a function can be used to test a property. It will receive the property of the error and should throw when an assertion does not pass.

```js
import throws from 'assert-throws'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  const error = new Error('test-error')
  throw error
}

(async function example() {
  try {
    // 1. TEST that a function throws with a function (pass).
    await throws({
      fn: testThrows,
      stack(stack) {
        if (!/at testThrows/.test(stack)) {
          throw new Error('The function does not have the correct stack.')
        }
      },
    })

    // 2. TEST that a function throws with a function (fail).
    await throws({
      fn: testThrows,
      stack(stack) {
        if (/anonymous/.test(stack)) {
          throw new Error('The function has an anonymous call stack line.')
        }
      },
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: The function has an anonymous call stack line.
    at example (/Users/zavr/adc/assert-throws/example/function.js:22:11)
    at <anonymous>
```

### Multiple Assertions

Any number of assertions can be added at the same time, and they will all be executed. However, only the first failing assertion will be presented.

```js
import cleanStack from 'clean-stack'
import throws from 'assert-throws'

async function testThrows() {
  const err = new Error('test-error')
  err.code = 'ENOTEST'
  err.actual = -1
  err.expected = Infinity
  await new Promise(r => setTimeout(r, 100))
  err.stack = cleanStack(err.stack)
  throw err
}

(async function example() {
  try {
    // 1. TEST that a function throws with a regexp (pass).
    await throws({
      fn: testThrows,
      message: 'test-error',
      code: /TEST/,
      stack(stack) {
        if (/Module._compile/.test(stack)) {
          throw new Error('The stack has a Node.js internal line.')
        }
      },
      actual: -1,
      expected: Infinity,
    })

    // 2. TEST that a function throws with a regexp (fail).
    await throws({
      fn: testThrows,
      message: 'test-error',
      code: /enotest/i,
      stack(stack) {
        if (/Module._compile/.test(stack)) {
          throw new Error('The stack has a Node.js internal line.')
        }
      },
      actual: -1,
      expected: -Infinity,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: [32m-[0m[90mInfinity[0m
Infinity != -Infinity
    at example (/Users/zavr/adc/assert-throws/example/multiple.js:31:11)
    at <anonymous>
```

### Strict Equality

`assert-throws` allows to assert on a strict equality of an error.

```js
import throws from 'assert-throws'

const error = new Error('test-error')

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  throw error
}

(async function example() {
  try {
    // 1. TEST that a function throws the correct error (pass).
    await throws({
      fn: testThrows,
      error,
    })

    // 1. TEST that a function throws the correct error (fail).
    await throws({
      fn: testThrows,
      error: new Error('Another error.'),
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```
Error: Error: test-error is not strict equal to Error: Another error..
    at example (/Users/zavr/adc/assert-throws/example/strict.js:19:11)
    at <anonymous>
```

## TODO

- [ ] Test error stack assertions.

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz