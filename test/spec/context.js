const { equal } = require('assert')
const assertThrows = require('../..')

const contextTestSuite = {
  async 'should pass context to a function'() {
    const test = 'hello-world'
    try {
      await assertThrows({
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
      await assertThrows({
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

module.exports = contextTestSuite
