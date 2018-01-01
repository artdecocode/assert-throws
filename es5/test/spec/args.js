var _require = require('assert'),
    equal = _require.equal;

var assertThrows = require('../../src/');

var argsTestSuite = {
    'should pass arguments to a function'() {
        return new Promise(function ($return, $error) {
            var test, message;

            test = 'test-arg';
            var $Try_1_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_1_Catch = function (_ref) {
                try {
                    message = _ref.message;

                    equal(message, `${test} != context-assert-error`);
                    return $Try_1_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);try {
                return Promise.resolve(assertThrows({
                    fn(test) {
                        return new Promise(function ($return, $error) {
                            return $error(new Error(test));
                        }.bind(this));
                    },
                    message: 'context-assert-error',
                    args: [test]
                })).then(function ($await_2) {
                    try {
                        throw new Error('should have thrown');
                    } catch ($boundEx) {
                        return $Try_1_Catch($boundEx);
                    }
                }.bind(this), $Try_1_Catch);
            } catch (_ref) {
                $Try_1_Catch(_ref)
            }
        }.bind(this));
    }
};

module.exports = argsTestSuite;