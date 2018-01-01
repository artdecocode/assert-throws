const { equal, notEqual } = require('assert')
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
        try {
            await assertThrows({
                async fn() {
                    notEqual(this, global)
                },
                code: 'ERR_ASSERTION-assert',
            })
            throw new Error('should have thrown')
        } catch ({ message }) {
            equal(message, 'ERR_ASSERTION != ERR_ASSERTION-assert')
        }
    },
}

module.exports = contextTestSuite
