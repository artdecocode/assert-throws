import cleanStack from 'clean-stack'
import throws from '../src'

async function testThrows() {
  const err = new Error('test-error')
  err.code = 'ENOTEST'
  err.actual = -1
  err.expected = Infinity
  await new Promise(r => setTimeout(r, 100))
  err.stack = cleanStack(err.stack)
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
        if (/Module._compile/.test(stack)) {
          throw new Error('The stack has a Node.js internal line.')
        }
      },
      actual: -1,
      expected: Infinity,
    })

    // 2. TEST that a function throws with a regexp (fail).
    await throws({
      fn: testThrows,
      message: 'test-error',
      code: /enotest/i,
      stack(stack) {
        if (/Module._compile/.test(stack)) {
          throw new Error('The stack has a Node.js internal line.')
        }
      },
      actual: -1,
      expected: -Infinity,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()