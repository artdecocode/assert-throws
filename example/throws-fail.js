import throws from '../src'

const testThrows = async () => {
  await new Promise(r => setTimeout(r, 100))
}

(async function example() {
  try {
    await throws({
      fn: testThrows,
    })
  } catch ({ stack }) {
    console.log(stack)
  }
})()