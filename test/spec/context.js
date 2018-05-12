/* global throws */
import { equal } from 'assert'

const T = {
  async 'should pass context to a function'() {
    const test = 'hello-world'
    try {
      await throws({
        async fn() {
          throw new Error(this.test)
        },
        message: 'context-assert-error',
        context: { test },
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, `${test} != context-assert-error`)
    }
  },
  async 'should pass null context to a function by default'() {
    const test = 'test-error'
    try {
      await throws({
        async fn() {
          if (this === global) {
            throw new Error(test)
          }
        },
        message: 'context-assert-error',
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, `${test} != context-assert-error`)
    }
  },
}

export default T
