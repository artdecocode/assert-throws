## `throws({ fn: function, message?: string|RegExp, code?: string, error?: Error context?, args?: any[] }): Promise.<Error>`

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
