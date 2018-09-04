import erte from 'erte'
import erotic from 'erotic'

const equal = (a, b) => {
  if (a != b) {
    const e = erte(`${a}`, `${b}`)
    const msg = `${a} != ${b}`
    const er = new Error(`${e}\n${msg}`) //
    throw er
  }
}

const assertString = (errorMessage, m) => {
  equal(errorMessage, m)
}

const assertRe = (actual, re) => {
  const res = re.test(actual)
  if (!res) {
    throw new Error(`${actual} does not match regular expression ${re}`)
  }
}

const assertFn = async (actual, fn) => {
  await fn(actual)
}

const assert = async (prop, assertion) => {
  if (assertion instanceof RegExp) {
    assertRe(prop, assertion)
  } else if (typeof assertion == 'function') {
    await assertFn(prop, assertion)
  } else if (assertion) {
    assertString(prop, assertion)
  }
}

/**
 * Assert that a function throws and check the thrown error properties.
 * @param {Config} config Parameters to the `assert-throws` method.
 * @param {function} config.fn Function to test, either sync or async.
 * @param {any|any[]} [config.args] Arguments to pass to the function.
 * @param {any} [config.context] The context in which to execute the function. Global context will be set by default.
 * @param {Assertion} [config.message] A string, regex, or function to test the message.
 * @param {Assertion} [config.code] A string, regex, or function to test the code.
 * @param {Assertion} [config.stack] A string, regex, or function to test the stack.
 * @param {Assertion} [config.prop] A string, regex, or function to test any other property of the error.
 * @param {Error} [config.error] An error to perform strict comparison against.
 * @example
 *
 * import throws from 'assert-throws'
 * import { method } from './lib'
 *
 * await throws({
 *  fn: method,
 *  args: ['test', true],
 *  message: /An error occurred:/, // regex
 *  code: 'ENOTEST',               // string
 *  stack(stack) {                 // function
 *    equal(stack.length, 2)
 *  }
 * })
 */
export default async function assertThrows(config) {
  if (!config) throw new Error('Config expected.')
  const e = erotic(true)
  const {
    fn, args = [], context, error, ...props
  } = config
  if (typeof fn != 'function') throw new Error('Function expected.')
  const arg = Array.isArray(args) ? args : [args]

  try {
    const thrownError = await wrap(fn, context, arg, error, props)
    return thrownError
  } catch (err) {
    const er = e(err)
    throw er
  }
}

const wrap = async (fn, context, args, error, props) => {
  const shouldHaveThrownError = new Error()
  try {
    if (context) {
      await fn.call(context, ...args)
    } else {
      await fn(...args)
    }
    throw shouldHaveThrownError
  } catch (err) {
    if (err === shouldHaveThrownError) {
      const n = fn.name && fn.name !== 'fn' ? `${fn.name} ` : ''
      throw new Error(`Function ${n}should have thrown.`)
    }
    if (error && error !== err) {
      throw new Error(`${err} is not strict equal to ${error}.`)
    }

    await Object.keys(props).reduce(async (acc, k) => {
      await acc
      const assertion = props[k]
      const actual = err[k]
      await assert(actual, assertion)
    }, {})

    return err
  }
}

/* documentary types/index.xml */
/**
 * @typedef {string|RegExp|function} Assertion An assertion to perform.
 *
 * @typedef {Object} Config Parameters to the `assert-throws` method.
 * @prop {function} fn Function to test, either sync or async.
 * @prop {any|any[]} [args] Arguments to pass to the function.
 * @prop {any} [context] The context in which to execute the function. Global context will be set by default.
 * @prop {Assertion} [message] A string, regex, or function to test the message.
 * @prop {Assertion} [code] A string, regex, or function to test the code.
 * @prop {Assertion} [stack] A string, regex, or function to test the stack.
 * @prop {Assertion} [prop] A string, regex, or function to test any other property of the error.
 * @prop {Error} [error] An error to perform strict comparison against.
 */
