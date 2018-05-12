import { equal } from 'assert'
import throws from '../../src'

const T = {
  async 'passes arguments to a function'() {
    const test = 'test-arg'
    try {
      await throws({
        async fn(test) {
          throw new Error(test)
        },
        message: 'context-assert-error',
        args: [test],
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, `${test} != context-assert-error`)
    }
  },
}

export default T
