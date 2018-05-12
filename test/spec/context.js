/* global throws */

const T = {
  async 'passes context to the function'() {
    const message = 'hello-world'
    const context = { test: message }
    await throws({
      async fn() {
        if (this === context) {
          throw new Error(this.test)
        }
      },
      message,
      context,
    })
  },
  async 'passes null context to the function by default'() {
    const message = 'test-error'
    await throws({
      async fn() {
        if (this === null) {
          throw new Error(message)
        }
      },
      message,
    })
  },
}

export default T
