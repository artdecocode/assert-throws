import throws from '..'

(async () => {
  const message = 'test-error-message'
  await throws({
    async fn() {
      throw new Error(message)
    },
    message,
  })
})()

;(async () => {
  // ok
  await throws({
    async fn() {
      throw new Error('test-error')
    },
    message: 'test-error',
  })

  await throws({
    async fn() {
      throw new Error('test-error')
    },
  })

  // not ok
  try {
    await throws({
      async fn() { },
    })
  } catch (err) {
    console.log(1, err) // Error: Function should have thrown
  }

  try {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      message: 'error-test',
    })
  } catch (err) {
    console.log(2, err) // Error: test-error != error-test
  }

  try {
    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: 'ENOENT1',
    })
  } catch (err) {
    console.log(3, err) // ENOENT != ENOENT1
  }

  try {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      error: new Error('test-error-fail'),
    })
  } catch(err) {
    console.log(4, err)
  }
})()
