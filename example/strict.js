import throws from '../src'

const error = new Error('test-error')

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  throw error
}

(async function example() {
  try {
    // 1. TEST that a function throws the correct error (pass).
    await throws({
      fn: testThrows,
      error,
    })

    // 1. TEST that a function throws the correct error (fail).
    await throws({
      fn: testThrows,
      error: new Error('Another error.'),
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()