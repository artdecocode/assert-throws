const assertThrows = require('../..')
const { equal } = require('assert')

const argErrorsTestSuite = {
    async 'should throw when function is not passed'() {
        try {
            await assertThrows({
            })
        } catch ({ message }) {
            equal(message, 'function expected')
        }
    },
    async 'should throw when function is not a function'() {
        try {
            await assertThrows({
                fn: 'test',
            })
        } catch ({ message }) {
            equal(message, 'function expected')
        }
    },
    async 'should throw when message is passed and is not string'() {
        try {
            await assertThrows({
                fn: () => { throw new Error('test') },
                message: 1,
            })
        } catch ({ message }) {
            equal(message, 'please pass an error message as a string')
        }
    },
}

module.exports = argErrorsTestSuite
