import throws from '../src'

async function testThrows() {
  if (this.shouldThrow) throw new Error('An error occurred.')
}

(async function example() {
  try {
    // 1. TEST a function with context (pass).
    await throws({
      fn: testThrows,
      context: { shouldThrow: true },
    })

    // 2.  TEST a function with a context (fail).
    await throws({
      fn: testThrows,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()