function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var equal = function equal(a, b) {
    if (a != b) throw new Error(`${a} != ${b}`);
};
function assertThrows(_ref) {
    return new Promise(function ($return, $error) {
        var fn, message, _ref$args, args, _ref$context, context, shouldHaveThrownError;

        fn = _ref.fn, message = _ref.message, _ref$args = _ref.args, args = _ref$args === undefined ? [] : _ref$args, _ref$context = _ref.context, context = _ref$context === undefined ? null : _ref$context;

        if (typeof fn !== 'function') return $error(new Error('function expected'));
        if (message && typeof message !== 'string') {
            return $error(new Error('please pass an error message as a string'));
        }

        shouldHaveThrownError = new Error('Function should have thrown');
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }.bind(this);var $Try_1_Catch = function (err) {
            try {
                if (err === shouldHaveThrownError) {
                    throw err;
                }
                if (message) {
                    equal(err.message, message);
                }
                return $Try_1_Post();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }.bind(this);try {
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