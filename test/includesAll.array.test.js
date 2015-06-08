var assert = require('assert'),
    _ = require('lodash');

require('../src/lodash-includesAllSome'); // no need to store to variable; modifies lodash's `_`

describe('_.includesAll() with arrays', function() {
    it('should return true when arguments are: [1, 2, 3, 4], [2, 4]', function() {
        // multiple non-collection arguments
        assert.ok(_.includesAll([1, 2, 3, 4], [2, 4]), '[1, 2, 3, 4] includes all of: [2, 4]');
    });

    it('should return true when arguments are: [1, 2, 3, 4], 3', function() {
        assert.ok(_.includesAll([1, 2, 3, 4], 3), '[1, 2, 3, 4] includes all of: 3');
    });

    it('should return false when arguments are: [1, 2, 3, 4], [1, 2], 1', function() {
        assert.ok(!_.includesAll([1, 2, 3, 4], [1, 2], 1), '[2, 3, 4] does not include all of: [1, 2]');
    });

    it('should return false when arguments are: [1, 2, 3, 4], 5', function() {
        assert.ok(!_.includesAll([1, 2, 3, 4], 5), '[1, 2, 3, 4] does not include all of: 5');
    });

    it('should return false when arguments are: [1, 2, 3, 4], [3, 5]', function() {
        // tests partial match
        assert.ok(!_.includesAll([1, 2, 3, 4], [3, 5]), '[1, 2, 3, 4] does not include all of: [3, 5]')
    })

    it('should return true when arguments are: [1, 2, 3, 4], [3, 1]', function() {
        // confirms that order doesn't matter
        assert.ok(_.includesAll([1, 2, 3, 4], [3, 1]), '[1, 2, 3, 4] includes all of: [3, 1]');
    });

    it('should return false when arguments are: [1, 2, 3, 4], [1, 2, 3, 4, 5]', function() {
        assert.ok(!_.includesAll([1, 2, 3, 4], [1, 2, 3, 4, 5]), '[1, 2, 3, 4] does not include all of: [1, 2, 3, 4, 5]');
    });

    it('should return false when arguments are: [1, 2, 3, 4], [[2, 3]]', function() {
        // tests nested arrays
        assert.ok(!_.includesAll([1, 2, 3, 4], [[2, 3]]), '[1, 2, 3, 4] does not include all of: [[2, 3]]');
    });

    it('should return false when arguments are: [1, 2, [3, 4]], [1, [3, 4]]', function() {
        // returns false because it uses SameValueZero comparison, just like `_.includes`
        assert.ok(!_.includesAll([1, 2, [3, 4]], [1, [3, 4]]), '[1, 2, 3, 4] includes all of: [1, [3, 4]]');
    });

    it('should return true when arguments are: [1, 2, someArray], [1, someArray]', function() {
        // should return true since someArray is self-identical
        var someArray = [5, 8];
        assert.ok(_.includesAll([1, 2, someArray], [1, someArray]), '[1, 2, someArray] includes all of: [1, someArray]');
    });
});

