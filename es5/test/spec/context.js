var _require = require('assert'),
    equal = _require.equal;

var assertThrows = require('../../src/');

var contextTestSuite = {
    'should pass context to a function'() {
        return new Promise(function ($return, $error) {
            var test, message;

            test = 'hello-world';
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
                    fn() {
                        return new Promise(function ($return, $error) {
                            return $error(new Error(this.test));
                        }.bind(this));
                    },
                    message: 'context-assert-error',
                    context: { test }
                })).then(function ($await_3) {
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
    },
    'should pass null context to a function by default'() {
        return new Promise(function ($return, $error) {
            var test, message;

            test = 'test-error';
            var $Try_2_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_2_Catch = function (_ref2) {
                try {
                    message = _ref2.message;

                    equal(message, `${test} != context-assert-error`);
                    return $Try_2_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);try {
                return Promise.resolve(assertThrows({
                    fn() {
                        return new Promise(function ($return, $error) {
                            if (this === global) {
                                return $error(new Error(test));
                            }
                            return $return();
                        }.bind(this));
                    },
                    message: 'context-assert-error'
                })).then(function ($await_4) {
                    try {
                        throw new Error('should have thrown');
                    } catch ($boundEx) {
                        return $Try_2_Catch($boundEx);
                    }
                }.bind(this), $Try_2_Catch);
            } catch (_ref2) {
                $Try_2_Catch(_ref2)
            }
        }.bind(this));
    }
};

module.exports = contextTestSuite;