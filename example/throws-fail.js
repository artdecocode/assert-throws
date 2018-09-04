import throws from '../src'

(async function example() {
  try {
    await throws({
      async fn() {
        // this function does not throw
      },
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()