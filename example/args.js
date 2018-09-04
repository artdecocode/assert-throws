import throws from '../src'

const testThrows = async (message, shouldThrow = true) => {
  if (shouldThrow) throw new Error(message)
}

(async function example() {
  try {
    // 1. TEST that a function with arguments throws (pass).
    await throws({
      fn: testThrows,
      args: ['An argument in the array'],
    })

    // 2. TEST that a function with an argument throws (pass).
    await throws({
      fn: testThrows,
      args: 'A single argument',
    })

    // 2. TEST that a function with arguments throws (alternative) (pass).
    await throws({
      async fn() {
        await testThrows('A single argument')
      },
    })

    // 3. TEST that a function with arguments throws (fail).
    await throws({
      fn: testThrows,
      args: ['An error occurred.', false],
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()