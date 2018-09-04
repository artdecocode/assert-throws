import { equal } from 'assert'
import throws from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'passes an argument to a function'({ message }) {
    const err = await throws({
      fn(arg) {
        throw new Error(arg)
      },
      args: message,
    })
    equal(err.message, message)
  },
  async 'passes arguments to a function'({ message }) {
    const err = await throws({
      fn(arg, arg2) {
        const m = `${arg} ${arg2}`
        throw new Error(m)
      },
      args: [message, 'test'],
    })
    equal(err.message, `${message} test`)
  },
}

export default T