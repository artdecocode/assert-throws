import { equal, ok } from 'zoroaster/assert'
import { strictEqual } from 'assert'
import throws from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof throws, 'function')
  },
  async 'calls the error function'() {
    let called = false
    await throws({
      async fn() {
        called = true
        throw new Error('test-error')
      },
    })
    ok(called)
  },
  async 'throws if function does not throw'({ assertThrows }) {
    await assertThrows(throws, {
      fn() {},
    }, ({ message }) => {
      equal(message, 'Function should have thrown.')
    })
  },
  async 'asserts on error strict equality'() {
    const error = new Error('test-error')
    await throws({
      async fn() {
        throw error
      },
      error,
    })
  },
  async 'fails assert on error strict equality'() {
    const error = new Error('test-error')
    try {
      await throws({
        async fn() {
          throw error
        },
        error: new Error('test-error-assert'),
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'Error: test-error is not strict equal to Error: test-error-assert.')
    }
  },
  async 'returns an error'({ message }) {
    const error = new Error(message)
    const actual = await throws({
      async fn() {
        throw error
      },
      message,
    })
    strictEqual(actual, error)
  },
  async 'works with a sync function'({ message }) {
    const e = new Error(message)
    const err = await throws({
      fn() {
        throw e
      },
      message,
    })
    equal(err, e)
    equal(err.message, message)
  },
}

export default T