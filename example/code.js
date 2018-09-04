import throws from '../src'

(async () => {
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