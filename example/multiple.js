import throws from '../src'

async function testThrows() {
  const err = new Error('test-error')
  err.code = 'ENOTEST'
  err.actual = -1
  err.expected = Infinity
  await new Promise(r => setTimeout(r, 100))
  throw err
}

(async function example() {
  try {
    // 1. TEST that a function throws with a regexp (pass).
    await throws({
      fn: testThrows,
      message: 'test-error',
      code: /TEST/,
      stack(stack) {
        if (/anonymous/.test(stack)) {
          throw new Error('The function has an anonymous stack line.')
        }
      },
      actual: -1,
      expected: Infinity,
    })

    // 2. TEST that a function throws with a regexp (fail).
    await throws({
      fn: testThrows,
      message: 'test-error',
      code: /example/,
      stack(stack) {
        if (/anonymous/.test(stack)) {
          throw new Error('The function has an anonymous stack line.')
        }
      },
      actual: 1,
      expected: -Infinity,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()