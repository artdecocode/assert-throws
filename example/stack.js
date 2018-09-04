import throws from '../src'

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