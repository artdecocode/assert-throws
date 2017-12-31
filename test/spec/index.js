const assert = require('assert')
const context = require('../context/')
const assertThrows = require('../../src/')

const assertThrowsTestSuite = {
    context,
    'should be a function': () => {
        assert.equal(typeof assertThrows, 'function')
    },
    'should call package without error': () => {
        assert.doesNotThrow(() => {
            assertThrows()
        })
    },
}

module.exports = assertThrowsTestSuite
