import throws from '../src'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('test-error')
}

(async function example() {
  try {
    // 1. TEST that a function throws with a string (pass).
    await throws({
      fn: testThrows,
      message: 'test-error',
    })

    // 2. TEST that a function throws with a string (fail).
    await throws({
      fn: testThrows,
      message: 'wrong-error',
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()