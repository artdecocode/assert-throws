import throws from '../src'

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