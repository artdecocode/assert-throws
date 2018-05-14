/* global throws */
const { ok } = require('assert')

const T = {
  async 'error message'() {
    try {
      await throws({
        async fn() {
          await new Promise((_, r) => {
            setTimeout(() => {
              r(new Error('test error'))
            })
          })
        },
        message: 'test',
      })
      throw new Error('had to throw')
    } catch ({ stack }) {
      const [,,l] = stack.split('\n', 3)
      ok(/at error message/.test(l))
    }
  },
  async 'error code'() {
    try {
      await throws({
        async fn() {
          await new Promise((_, r) => {
            setTimeout(() => {
              const e = new Error('test error')
              e.code = 'tset'
              r(e)
            })
          })
        },
        code: 'test',
      })
      throw new Error('had to throw')
    } catch ({ stack }) {
      const [,,l] = stack.split('\n', 3)
      ok(/at error code/.test(l))
    }
  },
  async 'error strict equality'() {
    const error = new Error('test error')
    try {
      await throws({
        async fn() {
          await new Promise((_, r) => {
            setTimeout(() => {
              const e = new Error('test')
              r(e)
            })
          })
        },
        error,
      })
      throw new Error('had to throw')
    } catch ({ stack }) {
      const [,l] = stack.split('\n', 2)
      ok(/at error strict equality/.test(l))
    }
  },
  async 'no error'() {
    try {
      await throws({
        fn() { },
      })
    } catch ({ stack }) {
      const [,l] = stack.split('\n', 2)
      ok(/at no error/.test(l))
    }
  },
}

export default T
