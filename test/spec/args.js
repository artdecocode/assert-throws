const { equal } = require('assert')
const assertThrows = require('../..')

const argsTestSuite = {
    async 'should pass arguments to a function'() {
        const test = 'test-arg'
        try {
            await assertThrows({
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

module.exports = argsTestSuite
