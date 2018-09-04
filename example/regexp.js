import throws from '../src'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  const error = new Error('test-error')
  error.code = 'ENOENT'
  throw error
}

(async function example() {
  try {
    // 1. TEST that a function throws with a regexp (pass).
    await throws({
      fn: testThrows,
      code: /enoent/i,
    })

    // 2. TEST that a function throws with a regexp (fail).
    await throws({
      fn: testThrows,
      code: /ENOEXMPL/,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()