const equal = (a, b) => {
    if (a != b) throw new Error(`${a} != ${b}`)
}

function assertMessage(err, message) {
    if (message instanceof RegExp) {
        const res = message.test(err.message)
        if (!res) {
            throw new Error(`${err.message} does not match regular expression ${message}`)
        }
    } else if (message) {
        equal(err.message, message)
    }
}

function assertCode(err, code) {
    if (code) {
        equal(err.code, code)
    }
}

/**
 * Assert that a function throws.
 * @param {object} config
 * @param {function} config.fn Function to test, either sync or async
 * @param {any[]} [config.args] Arguments to pass to the function
 * @param {string|RegExp} [config.message] Message to test against
 * @param {string} [config.code] Code to test against
 * @param {Error} [config.error] An error to perform strict comparison against.
 * @param {object} [config.context] Context in which to execute the function,
 * global context by default
 */
async function assertThrows(config) {
    const {
        fn, message, code, args = [], context = null, error,
    } = config
    if (typeof fn !== 'function') throw new Error('function expected')
    const isMessageRe = message instanceof RegExp
    if (message && !isMessageRe && typeof message !== 'string') {
        throw new Error('please pass an error message as a string or regular expression')
    }

    const shouldHaveThrownError = new Error('Function should have thrown')
    try {
        await fn.call(context, ...args)
        throw shouldHaveThrownError
    } catch (err) {
        if (err === shouldHaveThrownError) {
            throw err
        }
        if (error && error !== err) {
            throw new Error(`${err} is not strict equal to ${error}.`)
        }
        assertMessage(err, message)
        assertCode(err, code)
    }
}

module.exports = assertThrows
