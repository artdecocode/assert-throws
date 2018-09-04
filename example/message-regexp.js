import throws from '../src'

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