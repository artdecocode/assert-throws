import throws from '../src'

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