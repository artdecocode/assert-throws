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
    async 'should throw if function does not throw'() {
        try {
            await assertThrows({
                async fn() { },
            })
            throw new Error('should have thrown')
        } catch ({ message }) {
            equal(message, 'Function should have thrown')
        }
    },
    async 'should assert on error messages'() {
        await assertThrows({
            async fn() {
                throw new Error('test-error')
            },
            message: 'test-error',
        })
    },
    async 'should throw when asserting on error messages'() {
        try {
            await assertThrows({
                async fn() {
                    throw new Error('test-error1')
                },
                message: 'test-error',
            })
            throw new Error('should have thrown')
        } catch ({ message }) {
            equal(message, 'test-error1 != test-error')
        }
    },
    async 'should assert on error code'() {
        await assertThrows({
            async fn() {
                const error = new Error('test-error')
                error.code = 'ENOENT'
                throw error
            },
            code: 'ENOENT',
        })
    },
    async 'should throw when asserting on error code'() {
        try {
            await assertThrows({
                async fn() {
                    const error = new Error('test-error')
                    error.code = 'ENOENT-actual'
                    throw error
                },
                code: 'ENOENT-assert',
            })
            throw new Error('should have thrown')
        } catch ({ message }) {
            equal(message, 'ENOENT-actual != ENOENT-assert')
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
