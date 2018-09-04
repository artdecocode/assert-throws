import erte from 'erte'
import erotic from 'erotic'

const equal = (a, b) => {
  if (a != b) {
    const e = erte(a, b)
    const msg = `${a} != ${b}`
    const er = new Error(`${e}\n${msg}`) //
    throw er
  }
}

const matchString = (errorMessage, m) => {
  equal(errorMessage, m)
}

const assertRe = (actual, re) => {
  const res = re.test(actual)
  if (!res) {
    throw new Error(`${actual} does not match regular expression ${re}`)
  }
}

function assertMessage({ message: errorMessage }, message) {
  if (message instanceof RegExp) {
    assertRe(errorMessage, message)
  } else if (message) {
    matchString(errorMessage, message)
  }
}

function assertCode({ code: errorCode }, code) {
  if (code instanceof RegExp) {
    assertRe(errorCode, code)
  } else if (code) {
    matchString(errorCode, code)
  }
}

function assertStack({ stack: errorStack }, stack) {
  if (stack instanceof RegExp) {
    assertRe(errorStack, stack)
  } else if (stack) {
    matchString(errorStack, stack)
  }
}

const shouldHaveThrownError = new Error('Function should have thrown.')

/**
 * Assert that a function throws and check its properties.
 * @param {Config} config Parameters to the `assert-throws` method.
 * @param {function} config.fn Function to test, either sync or async.
 * @param {any[]} [config.args] Arguments to pass to the function.
 * @param {string|RegExp} [config.message] Message to test against.
 * @param {string|RegExp} [config.code] Code to test against.
 * @param {string|RegExp} [config.stack] Stack to test against.
 * @param {Error} [config.error] An error to perform strict comparison against.
 * @param {any} [config.context="null"] The context in which to execute the function. Default `null`.
 * @example
 *
 * import throws from 'assert-throws'
 * import { method } from './lib'
 *
 * await throws({
 *  fn: method,
 *  args: ['test', true],
 *  message: /An error occurred:/,
 *  code: 'ENOTEST',
 * })
 */
export default async function assertThrows(config) {
  const e = erotic(true)
  const {
    fn, message, code, stack, args = [], context = null, error,
  } = config
  if (typeof fn != 'function') throw new Error('function expected')
  const isMessageRe = message instanceof RegExp
  if (message && !isMessageRe && typeof message !== 'string') {
    throw new Error('please pass an error message as a string or regular expression')
  }

  try {
    await fn.call(context, ...args)
    throw shouldHaveThrownError
  } catch (err) {
    if (err === shouldHaveThrownError) {
      throw e(err)
    }
    if (error && error !== err) {
      throw e(`${err} is not strict equal to ${error}.`)
    }
    try {
      assertMessage(err, message)
      assertCode(err, code)
      assertStack(err, stack)
    } catch ({ message }) {
      throw e(message)
    }
    return e(err)
  }
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Parameters to the `assert-throws` method.
 * @prop {function} fn Function to test, either sync or async.
 * @prop {any[]} [args] Arguments to pass to the function.
 * @prop {string|RegExp} [message] Message to test against.
 * @prop {string|RegExp} [code] Code to test against.
 * @prop {string|RegExp} [stack] Stack to test against.
 * @prop {Error} [error] An error to perform strict comparison against.
 * @prop {any} [context="null"] The context in which to execute the function. Default `null`.
 */
