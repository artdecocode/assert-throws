const assert = require('assert')
const context = require('../context/')
const assertThrows = require('../..')

const { equal, strictEqual } = assert

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
    async 'should pass when asserting on error message with regular expression'() {
        await assertThrows({
            async fn() {
                throw new Error('test-error')
            },
            message: /test/,
        })
    },
    async 'should throw when asserting on error message with regular expression'() {
        try {
            await assertThrows({
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
    async 'should pass when asserting on error strict equality'() {
        const error = new Error('test-error')
        await assertThrows({
            async fn() {
                throw error
            },
            error,
        })
    },
    async 'should throw when asserting on strict equality'() {
        const error = new Error('test-error')
        try {
            await assertThrows({
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
    async 'should return an error'() {
        const error = new Error('test-error')
        const actual = await assertThrows({
            fn() {
                throw error
            },
            message: 'test-error',
        })
        strictEqual(actual, error)
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
