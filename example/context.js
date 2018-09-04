import throws from '../src'

(async function example() {
  function fn () {
    if (this.shouldThrow) throw new Error('An error occurred.')
  }
  try {
    await throws({
      fn,
      context: { shouldThrow: true },
    }) // pass

    await throws({
      fn,
      context: {},
    }) // fail
  } catch ({ stack }) {
    console.log(stack)
  }
})()