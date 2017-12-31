const equal = (a, b) => {
    if (a != b) throw new Error(`${a} != ${b}`)
}
async function assertThrows ({ fn, message, args = [], context = null }) {
    if (typeof fn !== 'function') throw new Error('function expected')
    if (message && typeof message !== 'string') {
        throw new Error('please pass an error message as a string')
    }

    const shouldHaveThrownError = new Error(`${fn} should have thrown`)
    try {
        await fn.call(context, ...args)
        throw shouldHaveThrownError
    } catch (err) {
        if (err === shouldHaveThrownError) {
            throw err
        }
        if (message) {
            equal(err.message, message)
        }
    }
}

module.exports = assertThrows
