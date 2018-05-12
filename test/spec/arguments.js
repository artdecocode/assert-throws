/* global throws */
import { equal } from 'assert'

const T = {
  async 'should throw when function is not passed'() {
    try {
      await throws({
      })
    } catch ({ message }) {
      equal(message, 'function expected')
    }
  },
  async 'should throw when function is not a function'() {
    try {
      await throws({
        fn: 'test',
      })
    } catch ({ message }) {
      equal(message, 'function expected')
    }
  },
  async 'should throw when message is passed and is not string'() {
    try {
      await throws({
        fn: () => { throw new Error('test') },
        message: 1,
      })
    } catch ({ message }) {
      equal(message, 'please pass an error message as a string or regular expression')
    }
  },
}

export default T
