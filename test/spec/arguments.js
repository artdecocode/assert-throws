import { equal } from 'assert'
import throws from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'throws when config is not passed'({ assertThrows }) {
    await assertThrows(throws, undefined, ({ message }) => {
      equal(message, 'Config expected.')
    })
  },
  async 'throws when function is not passed'({ assertThrows }) {
    await assertThrows(throws, {}, ({ message }) => {
      equal(message, 'Function expected.')
    })
  },
  async 'throws when function is not a function'({ assertThrows }) {
    await assertThrows(throws, 'test', ({ message }) => {
      equal(message, 'Function expected.')
    })
  },
}

export default T