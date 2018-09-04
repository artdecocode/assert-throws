import { ok } from 'zoroaster/assert'
import throws from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'error message'({ assertThrows, fn }) {
    await assertThrows(throws, {
      fn,
      message: 'expected-message',
    },
    ({ stack }) => {
      ok(/!=/.test(stack))
      ok(/at error message/.test(stack))
    })
  },
  async 'error code'({ assertThrows, fn }) {
    await assertThrows(throws, {
      fn,
      code: /expected-code/,
    },
    ({ stack }) => {
      ok(/does not match regular expression/.test(stack))
      ok(/at error code/.test(stack))
    })
  },
  async 'error strict equality'({ assertThrows, fn }) {
    await assertThrows(throws, {
      fn,
      error: new Error('expected-error'),
    },
    ({ stack }) => {
      ok(/is not strict equal to/.test(stack))
      ok(/at error strict equality/.test(stack))
    })
  },
  async 'should have thrown'({ assertThrows }) {
    await assertThrows(throws, { fn() {} }, ({ stack }) => {
      ok(/at should have thrown/.test(stack))
    })
  },
}

export default T