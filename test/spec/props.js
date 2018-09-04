import { equal, ok } from 'assert'
import throws from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const strings = {
  context: Context,
  async 'asserts on error message (pass)'({ message, fn }) {
    let called
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      message,
    })
    ok(called)
  },
  async 'asserts on error code (pass)'({ code, fn }) {
    let called
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      code,
    })
    ok(called)
  },
  async 'asserts on error message (fail)'({
    assertThrows, fn, message: actualMessage,
  }) {
    let called
    const expectedMessage = 'wrong-message'
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      message: expectedMessage,
    }, ({ message }) => {
      const m = `${actualMessage} != ${expectedMessage}`
      ok(message.includes(m))
    })
    ok(called)
  },
  async 'asserts on error code (fail)'({
    assertThrows, fn, code: actualCode,
  }) {
    let called
    const expectedCode = 'WRONGCODE'
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      code: expectedCode,
    }, ({ message }) => {
      const m = `${actualCode} != ${expectedCode}`
      ok(message.includes(m))
    })
    ok(called)
  },
}

/** @type {Object.<string, (c: Context)>} */
const numbers = {
  context: Context,
  async 'asserts on error actual (pass)'({ actual, fn }) {
    let called
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      actual,
    })
    ok(called)
  },
  async 'asserts on error actual (fail)'({ assertThrows, fn, actual }) {
    let called
    const expectedActual = -1
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      actual: expectedActual,
    }, ({ message }) => {
      const m = `${actual} != ${expectedActual}`
      ok(message.includes(m))
    })
    ok(called)
  },
}

/** @type {Object.<string, (c: Context)>} */
const regexps = {
  context: Context,
  async 'asserts on error message (pass)'({ messageRegExp, fn }) {
    let called
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      message: messageRegExp,
    })
    ok(called)
  },
  async 'asserts on error code (pass)'({ codeRegExp, fn }) {
    let called
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      code: codeRegExp,
    })
    ok(called)
  },
  async 'asserts on error message (fail)'({
    assertThrows, fn, message: actualMessage,
  }) {
    let called
    const expectedMessage = /wrong-message/
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      message: expectedMessage,
    }, ({ message }) => {
      const m = `${actualMessage} does not match regular expression ${expectedMessage}`
      ok(message.includes(m))
    })
    ok(called)
  },
  async 'asserts on error code (fail)'({
    assertThrows, fn, code: actualCode,
  }) {
    let called
    const expectedCode = /WRONGCODE/
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      code: expectedCode,
    }, ({ message }) => {
      const m = `${actualCode} does not match regular expression ${expectedCode}`
      ok(message.includes(m))
    })
    ok(called)
  },
}

/** @type {Object.<string, (c: Context)>} */
const functions = {
  context: Context,
  async 'asserts on error message (pass)'({ fn }) {
    let called
    let assertionCalled
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      message() {
        assertionCalled = true
      },
    })
    ok(called)
    ok(assertionCalled)
  },
  async 'asserts on error code (pass)'({ fn }) {
    let called
    let assertionCalled
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      code() {
        assertionCalled = true
      },
    })
    ok(called)
    ok(assertionCalled)
  },
  async 'asserts on error message (fail)'({ assertThrows, fn }) {
    let called
    let assertionCalled
    const e = new Error()
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      message() {
        assertionCalled = true
        throw e
      },
    }, (err) => {
      equal(err, e)
    })
    ok(called)
    ok(assertionCalled)
  },
  async 'asserts on error code (fail)'({ assertThrows, fn }) {
    let called
    let assertionCalled
    const e = new Error()
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      code() {
        assertionCalled = true
        throw e
      },
    }, (err) => {
      equal(err, e)
    })
    ok(called)
    ok(assertionCalled)
  },
}

/** @type {Object.<string, (c: Context)>} */
const asyncFunctions = {
  context: Context,
  async 'asserts on error message (pass)'({ fn }) {
    let called
    let assertionCalled
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      async message() {
        await new Promise(r => setTimeout(r, 100))
        assertionCalled = true
      },
    })
    ok(called)
    ok(assertionCalled)
  },
  async 'asserts on error code (pass)'({ fn }) {
    let called
    let assertionCalled
    await throws({
      async fn(...args) {
        called = true
        await fn(...args)
      },
      async code() {
        await new Promise(r => setTimeout(r, 100))
        assertionCalled = true
      },
    })
    ok(called)
    ok(assertionCalled)
  },
  async 'asserts on error message (fail)'({ assertThrows, fn }) {
    let called
    let assertionCalled
    const e = new Error()
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      async message() {
        await new Promise(r => setTimeout(r, 100))
        assertionCalled = true
        throw e
      },
    }, (err) => {
      equal(err, e)
    })
    ok(called)
    ok(assertionCalled)
  },
  async 'asserts on error code (fail)'({ assertThrows, fn }) {
    let called
    let assertionCalled
    const e = new Error()
    await assertThrows(throws, {
      async fn(...args) {
        called = true
        await fn(...args)
      },
      async code() {
        await new Promise(r => setTimeout(r, 100))
        assertionCalled = true
        throw e
      },
    }, (err) => {
      equal(err, e)
    })
    ok(called)
    ok(assertionCalled)
  },
}

export default { strings, regexps, numbers, functions, 'async functions': asyncFunctions }