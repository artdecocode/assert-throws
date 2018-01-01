var assertThrows = require('../../src/');

var _require = require('assert'),
    equal = _require.equal;

var argumentErrorsTestSuite = {
    'should throw when function is not passed'() {
        return new Promise(function ($return, $error) {
            var message;
            var $Try_1_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_1_Catch = function (_ref) {
                try {
                    message = _ref.message;

                    equal(message, 'function expected');
                    return $Try_1_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);
            try {
                return Promise.resolve(assertThrows({})).then(function ($await_4) {
                    try {
                        return $Try_1_Post();
                    } catch ($boundEx) {
                        return $Try_1_Catch($boundEx);
                    }
                }.bind(this), $Try_1_Catch);
            } catch (_ref) {
                $Try_1_Catch(_ref)
            }
        }.bind(this));
    },
    'should throw when function is not a function'() {
        return new Promise(function ($return, $error) {
            var message;
            var $Try_2_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_2_Catch = function (_ref2) {
                try {
                    message = _ref2.message;

                    equal(message, 'function expected');
                    return $Try_2_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);
            try {
                return Promise.resolve(assertThrows({
                    fn: 'test'
                })).then(function ($await_5) {
                    try {
                        return $Try_2_Post();
                    } catch ($boundEx) {
                        return $Try_2_Catch($boundEx);
                    }
                }.bind(this), $Try_2_Catch);
            } catch (_ref2) {
                $Try_2_Catch(_ref2)
            }
        }.bind(this));
    },
    'should throw when message is passed and is not string'() {
        return new Promise(function ($return, $error) {
            var message;
            var $Try_3_Post = function () {
                try {
                    return $return();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);var $Try_3_Catch = function (_ref3) {
                try {
                    message = _ref3.message;

                    equal(message, 'please pass an error message as a string');
                    return $Try_3_Post();
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }.bind(this);
            try {
                return Promise.resolve(assertThrows({
                    fn: function fn() {
                        throw new Error('test');
                    },
                    message: 1
                })).then(function ($await_6) {
                    try {
                        return $Try_3_Post();
                    } catch ($boundEx) {
                        return $Try_3_Catch($boundEx);
                    }
                }.bind(this), $Try_3_Catch);
            } catch (_ref3) {
                $Try_3_Catch(_ref3)
            }
        }.bind(this));
    }
};

module.exports = argumentErrorsTestSuite;