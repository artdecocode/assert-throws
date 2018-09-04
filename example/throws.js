import throws from '../src'

async function testThrows() {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('test-error')
}

(async function example() {
  // 1. TEST a throwing function.
  await throws({
    fn: testThrows,
  })

  // 2. TEST a throwing function (alternative syntax).
  await throws({
    async fn(){
      await testThrows()
    },
  })

  console.log('Everything passed.')
})()