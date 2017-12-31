const assert = require('assert')
const context = require('../context/')
const assertThrows = require('../..')

const { equal } = assert

const assertThrowsTestSuite = {
    context,
    'should be a function': () => {
        assert.equal(typeof assertThrows, 'function')
    },
    async 'should call the error function'() {
        let called = false
        await assertThrows({
            async fn() {
                called = true
                throw new Error('test-error')
            },
        })
        assert(called)
    },
    async 'should compare error messages'() {
        await assertThrows({
            async fn() {
                throw new Error('test-error')
            },
            message: 'test-error',
        })
    },
    async 'should throw when comparing error messages'() {
        try {
            await assertThrows({
                async fn() {
                    throw new Error('test-error1')
                },
                message: 'test-error',
            })
        } catch ({ message }) {
            equal(message, 'test-error1 != test-error')
        }
    },
    async 'should work with sync function'() {
        await assertThrows({
            fn() {
                throw new Error('test-error')
            },
            message: 'test-error',
        })
    },
}

module.exports = assertThrowsTestSuite
