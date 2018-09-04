import { equal } from 'zoroaster/assert'
import throws from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'passes context to the function'({ message }) {
    const context = { test: message }
    let c
    const err = await throws({
      fn() {
        c = this
        throw new Error(this.test)
      },
      context,
    })
    equal(c, context)
    equal(err.message, message)
  },
  async 'uses global context by default'({ message }) {
    let c
    const expected = this
    await throws({
      fn() {
        c = this
        throw new Error(message)
      },
    })
    equal(c, expected)
  },
  async 'can use bound context'({ message }) {
    let c
    const expected = {}
    function fun() {
      c = this
      throw new Error(message)
    }
    const fn = fun.bind(expected)
    await throws({
      fn,
    })
    equal(c, expected)
  },
}

export default T