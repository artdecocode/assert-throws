import throws from '../src'

(async function example() {
  const fn = async (shouldThrow) => {
    if (shouldThrow) throw new Error('An error occurred.')
  }
  try {
    await throws({
      fn,
      args: [true],
    }) // pass

    await throws({
      fn,
      args: [],
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()