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
        throw new Error('test-error')
      },
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz