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
        console.log(err) // Error: Function should have thrown
    }

    try {
        await assertThrows({
            async fn() {
                throw new Error('test-error')
            },
            message: 'error-test',
        })
    } catch (err) {
        console.log(err) // Error: test-error != error-test
    }
})()
