/* global ES5, throws */
import { equal } from 'assert'
import erte from 'erte'

const T = {
  async 'passes arguments to a function'() {
    const test = 'test-arg'
    const message = 'context-assert-error'
    const e = erte(test, message)
    try {
      await throws({
        async fn(test) {
          throw new Error(test)
        },
        message,
        args: [test],
      })
      throw new Error('should have thrown')
    } catch ({ message: m }) {
      if (ES5) throw new Error('Test not supported')
      const [l, n] = m.split('\n')
      equal(n, `${test} != ${message}`)
      equal(l, e)
    }
  },
}

export default T
