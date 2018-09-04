import throws from '../src'

(async function example() {
  try {
    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOTEST'
        throw error
      },
      code: /TEST/,
    }) // pass

    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: /EXAMPL/,
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()