import throws from '../src'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  const error = new Error('test-error')
  throw error
}

(async function example() {
  try {
    // 1. TEST that a function throws with a function (pass).
    await throws({
      fn: testThrows,
      stack(stack) {
        if (!/at testThrows/.test(stack)) {
          throw new Error('The function does not have the correct stack.')
        }
      },
    })

    // 2. TEST that a function throws with a function (fail).
    await throws({
      fn: testThrows,
      stack(stack) {
        if (/anonymous/.test(stack)) {
          throw new Error('The function has an anonymous call stack line.')
        }
      },
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()