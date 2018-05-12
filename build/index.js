"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertThrows;

var _erte = _interopRequireDefault(require("erte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const equal = (a, b) => {
  if (a != b) {
    const e = (0, _erte.default)(a, b);
    const msg = `${a} != ${b}`;
    const er = new Error(`${e}\n${msg}`); //

    throw er;
  }
};

const matchString = (errorMessage, m) => {
  equal(errorMessage, m);
};

function assertMessage({
  message: errorMessage
}, message) {
  if (message instanceof RegExp) {
    const res = message.test(errorMessage);

    if (!res) {
      throw new Error(`${errorMessage} does not match regular expression ${message}`);
    }
  } else if (message) {
    matchString(errorMessage, message);
  }
}

function assertCode(err, code) {
  if (code) {
    matchString(err.code, code);
  }
}
/**
 * Assert that a function throws.
 * @param {object} config
 * @param {function} config.fn Function to test, either sync or async
 * @param {any[]} [config.args] Arguments to pass to the function
 * @param {string|RegExp} [config.message] Message to test against
 * @param {string} [config.code] Code to test against
 * @param {Error} [config.error] An error to perform strict comparison against.
 * @param {object} [config.context] Context in which to execute the function,
 * global context by default
 */


async function assertThrows(config) {
  const {
    fn,
    message,
    code,
    args = [],
    context = null,
    error
  } = config;
  if (typeof fn != 'function') throw new Error('function expected');
  const isMessageRe = message instanceof RegExp;

  if (message && !isMessageRe && typeof message !== 'string') {
    throw new Error('please pass an error message as a string or regular expression');
  }

  const shouldHaveThrownError = new Error('Function should have thrown');

  try {
    await fn.call(context, ...args);
    throw shouldHaveThrownError;
  } catch (err) {
    if (err === shouldHaveThrownError) {
      throw err;
    }

    if (error && error !== err) {
      throw new Error(`${err} is not strict equal to ${error}.`);
    }

    assertMessage(err, message);
    assertCode(err, code);
    return err;
  }
}