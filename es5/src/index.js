function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var equal = function equal(a, b) {
  if (a != b) throw new Error(`${a} != ${b}`);
};

function assertMessage(err, message) {
  if (message instanceof RegExp) {
    var res = message.test(err.message);

    if (!res) {
      throw new Error(`${err.message} does not match regular expression ${message}`);
    }
  } else if (message) {
    equal(err.message, message);
  }
}

function assertCode(err, code) {
  if (code) {
    equal(err.code, code);
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


function assertThrows(config) {
  return new Promise(function ($return, $error) {
    var fn, message, code, _config$args, args, _config$context, context, error, isMessageRe, shouldHaveThrownError;

    fn = config.fn, message = config.message, code = config.code, _config$args = config.args, args = _config$args === void 0 ? [] : _config$args, _config$context = config.context, context = _config$context === void 0 ? null : _config$context, error = config.error;
    if (typeof fn !== 'function') return $error(new Error('function expected'));
    isMessageRe = message instanceof RegExp;

    if (message && !isMessageRe && typeof message !== 'string') {
      return $error(new Error('please pass an error message as a string or regular expression'));
    }

    shouldHaveThrownError = new Error('Function should have thrown');

    var $Try_1_Post = function () {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this);

    var $Try_1_Catch = function (err) {
      try {
        if (err === shouldHaveThrownError) {
          throw err;
        }

        if (error && error !== err) {
          throw new Error(`${err} is not strict equal to ${error}.`);
        }

        assertMessage(err, message);
        assertCode(err, code);
        return $return(err);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this);

    try {
      return Promise.resolve(fn.call.apply(fn, [context].concat(_toConsumableArray(args)))).then(function ($await_2) {
        try {
          throw shouldHaveThrownError;
        } catch ($boundEx) {
          return $Try_1_Catch($boundEx);
        }
      }.bind(this), $Try_1_Catch);
    } catch (err) {
      $Try_1_Catch(err)
    }
  }.bind(this));
}

module.exports = assertThrows;