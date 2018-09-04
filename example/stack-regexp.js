import throws from '../src'

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