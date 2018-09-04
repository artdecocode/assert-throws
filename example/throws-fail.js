import throws from '../src'

(async () => {
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