const assertThrows = require('.');

(async () => {
    // ok
    await assertThrows({
        async fn() {
            throw new Error('test-error')
        },
        message: 'test-error',
    })

    await assertThrows({
        async fn() {
            throw new Error('test-error')
        },
    })

    // not ok
    try {
        await assertThrows({
            async fn() { },
        })
    } catch (err) {
        console.log(1, err) // Error: Function should have thrown
    }

    try {
        await assertThrows({
            async fn() {
                throw new Error('test-error')
            },
            message: 'error-test',
        })
    } catch (err) {
        console.log(2, err) // Error: test-error != error-test
    }

    try {
        await assertThrows({
            async fn() {
                const error = new Error('test-error')
                error.code = 'ENOENT'
                throw error
            },
            code: 'ENOENT1',
        })
    } catch (err) {
        console.log(3, err) // ENOENT != ENOENT1
    }
})()
