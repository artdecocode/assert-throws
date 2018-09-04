import { equal, ok, strictEqual } from 'assert'
import erte from 'erte'
import throws from '../../src'

const T = {
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
  async 'throws if function does not throw'() {
    try {
      await throws({
        async fn() { },
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'Function should have thrown')
    }
  },
  async 'asserts on error messages'() {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      message: 'test-error',
    })
  },
  async 'throws when asserting on error messages'() {
    const test = 'test-error1'
    const message = 'test-error'
    const s = `${test} != ${message}`
    const e = erte(test, message)
    try {
      await throws({
        async fn() {
          throw new Error(test)
        },
        message,
      })
      throw new Error('should have thrown')
    } catch ({ message: m }) {
      if (ES5) {
        return equal(m, s)
      }
      const [l, n] = m.split('\n')
      equal(n, s)
      equal(l, e)
    }
  },
  async 'asserts on error message with regular expression'() {
    await throws({
      async fn() {
        throw new Error('test-error')
      },
      message: /test/,
    })
  },
  async 'fails assert on error message with regular expression'() {
    try {
      await throws({
        async fn() {
          throw new Error('test-error')
        },
        message: /test-error-assert/,
      })
      throw new Error('should have thrown')
    } catch ({ message }) {
      equal(message, 'test-error does not match regular expression /test-error-assert/')
    }
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
  async 'asserts on error code'() {
    await throws({
      async fn() {
        const error = new Error('test-error')
        error.code = 'ENOENT'
        throw error
      },
      code: 'ENOENT',
    })
  },
  async 'fails assert on error code'() {
    const test = 'ENOENT-actual'
    const code = 'ENOENT-assert'
    const s = `${test} != ${code}`
    const e = erte(test, code)
    try {
      await throws({
        async fn() {
          const error = new Error('test-error')
          error.code = 'ENOENT-actual'
          throw error
        },
        code,
      })
      throw new Error('should have thrown')
    } catch ({ message: m }) {
      if (ES5) {
        return equal(m, s)
      }
      const [l, n] = m.split('\n')
      equal(n, s)
      equal(l, e)
    }
  },
  async 'returns an error'() {
    const error = new Error('test-error')
    const actual = await throws({
      fn() {
        throw error
      },
      message: 'test-error',
    })
    strictEqual(actual, error)
  },
  async 'works with a sync function'() {
    await throws({
      fn() {
        throw new Error('test-error')
      },
      message: 'test-error',
    })
  },
}

export default T