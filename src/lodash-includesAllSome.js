/**
 *
 *  Mixin for lodash, providing `_.includesAll`, `_.includesSome`, and various aliases.
 *
 *  Author: Jason Rogers <jason@ascendiv.com>
 *  License: MIT
 *
 */

;(function(_) {
    // NOTE: For now, we are just outright assuming that, if there is no global `_` function, then we
    // are in an environment where we can simply `require` lodash (e.g., Node.js) and get on with our
    // business. This is an intentionally simplistic assumption.
    if (typeof _ === "undefined") {
        _ = require('lodash');
    }

    _.mixin({

        /**
         * Checks whether `includer` includes every item in `includee`, optionally starting the check at
         * `idx` in `includer`. Uses SameValueZero comparison, just like `_.includes` (which means, for
         * example, that [1, 2] !== [1, 2] (they are different objects), and, therefore, that [1, [2, 3]]
         * does not include [2, 3]).
         *
         * @alias _.includesEvery, _.containsAll, _.containsEvery
         * @param {Array|Object|string} includer The collection to investigate for inclusions.
         * @param {*} includee The value(s) to search for.
         * @param {number} [idx=0] The index in `includer` to begin searching from.
         * @returns {boolean} When `includee` is a noncollection value, returns `true` if `includer`
         *  contains `includee` (starting at `idx` or 0), and `false` otherwise. When `includee` is
         *  a collection, then:
         *      (i) if `includee` is a string and `includer` is also a string, returns `true` if every
         *      character in `includee` is in `includer`, and false otherwise;
         *      (ii) if `includee` is a string and `includer` is not a string, wraps `includee` in an
         *      array and returns true if every (one) item in that array is an element of `includer`, and
         *      false otherwise;
         *      (iii) if neither `includee` nor `includer` are strings, returns true if every element of
         *      `includee` is an element of `includer`, and false otherwise.
         * @example
         *
         * _.includesAll([1, 2, 3, 4], 1);
         * // => true
         *
         * _.includesAll([1, 2, 3, 4], [1, 3]);
         * // => true
         *
         * _.includesAll([1, 2, 3, 4], 1, 1);
         * // => false (check begins from index 1)
         *
         * _.includesAll([1, 2, 3, 4], [1, 3], 1);
         * // => false (check begins from index 1; not every element of [1, 3] is contained there)
         *
         * _.includesAll({ 'user': 'fred', 'age': 40 }, 'fred');
         * // => true
         *
         * _.includesAll({ 'user': 'fred', 'age': 40 }, 'fred', 1);
         * // => false
         *
         * _.includesAll({ 'user': 'fred', 'age': 40 }, ['fred', 40]);
         * // => true
         *
         * _.includesAll('string', 'in');
         * // => true
         *
         * _.includesAll([1, 'two', 3], 'two');
         * // => true
         */
        includesAll: function(includer, includee, idx) {
            var includerIsString = _.isString(includer);
            includer = includerIsString ? includer : _.values(includer);
            includee = _.isString(includee) && includerIsString || _.isArray(includee) ?
                       includee : [includee];
            return _.every(includee, _.partial(_.includes, includer.slice(_.isFinite(idx) ? idx : 0)));
        },

        /**
         * Checks whether `includer` includes some (at least one) of the items in `includee`, optionally
         * starting the check at `idx` in `includer`.
         *
         * @alias _.includesAny, _.containsSome, _.containsAny
         * @param {Array|Object|string} includer The collection to investigate for inclusions.
         * @param {*} includee The value(s) to search for.
         * @param {number} [idx=0] The index in `includer` to begin searching from.
         * @returns {boolean} When `includee` is a noncollection value, returns `true` if `includer`
         *  contains `includee` (starting at `idx` or 0), and `false` otherwise. When `includee` is
         *  a collection, then:
         *      (i) if `includee` is a string and `includer` is also a string, returns `true` if at least
         *      one character in `includee` is in `includer`, and false otherwise;
         *      (ii) if `includee` is a string and `includer` is not a string, wraps `includee` in an
         *      array and returns true if the item in that array is an element of `includer`, and false
         *      otherwise;
         *      (iii) if neither `includee` nor `includer` are strings, returns true if at least one
         *      element of `includee` is an element of `includer`, and false otherwise.
         * @example
         *
         * _.includesSome([1, 2, 3, 4], 1);
         * // => true
         *
         * _.includesSome([1, 2, 3, 4], [1, 5]);
         * // => true
         *
         * _.includesSome([1, 2, 3, 4], 1, 1);
         * // => false (check begins from index 1)
         *
         * _.includesSome([1, 2, 3, 4], [1, 3], 1);
         * // => true (check begins from index 1; 3 is the match)
         *
         * _.includesSome({ 'user': 'fred', 'age': 40 }, 'fred');
         * // => true
         *
         * _.includesSome({ 'user': 'fred', 'age': 40 }, 'fred', 1);
         * // => false
         *
         * _.includesSome({ 'user': 'fred', 'age': 40 }, ['barney', 40]);
         * // => true
         *
         * _.includesSome('string', 'in');
         * // => true
         *
         * _.includesSome([1, 'two', 3], 'two');
         * // => true
         *
         * _.includesSome('string', 'bonk');
         * // => true ('n' is in 'string')
         */
        includesSome: function(includer, includee, idx) {
            var includerIsString = _.isString(includer);
            includer = includerIsString ? includer : _.values(includer);
            includee = _.isString(includee) && includerIsString || _.isArray(includee) ?
                       includee : [includee];
            return _.some(includee, _.partial(_.includes, includer.slice(_.isFinite(idx) ? idx : 0)));
        }

    });

    // aliases
    _.mixin({
        includesEvery: _.includesAll,
        includesAny: _.includesSome,
        containsAll: _.includesAll,
        containsSome: _.includesSome,
        containsEvery: _.includesAll,
        containsAny: _.includesSome
    });
}(typeof _ === "function" ? _ : void 0));
