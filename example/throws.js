import throws from '../src'

(async function example() {
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