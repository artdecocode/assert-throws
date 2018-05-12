const defaultLib = '../../src'
const { LIB_MAIN = defaultLib } = process.env
const m = require(LIB_MAIN)
const throws = typeof m == 'function' ? m : m.default

global.throws = throws
global.ES5 = /es5$/.test(LIB_MAIN)

if (process.env.LIB_MAIN) {
  console.log('using lib @ %s', process.env.LIB_MAIN) // eslint-disable-line
}
