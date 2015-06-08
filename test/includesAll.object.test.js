var assert = require('assert'),
    _ = require('lodash');

require('../src/lodash-includesAllSome'); // no need to store to variable; modifies lodash's `_`

describe('_.includesAll() with objects', function() {
    it('should return true when arguments are: { "name": "jack", "age": 20 }, ["jack", 20]', function() {
        assert.ok(_.includesAll({ "name": "jack", "age": 20 }, ["jack", 20]),
            '{ "name": "jack", "age": 20 } includes all of: ["jack", 20]');
    });

    it('should return true when arguments are: { "name": "jack", "age": 20}, 20', function() {
        assert.ok(_.includesAll({ "name": "jack", "age": 20 }, 20),
            '{ "name": "jack", "age": 20 } includes all of: 20');
    });

    it('should return false when arguments are: { "name": "jack", "age": 20}, "age"', function() {
        assert.ok(!_.includesAll({ "name": "jack", "age": 20 }, "age"),
            '{ "name": "jack", "age": 20 } does not include all of: "age"');
    });

    it('should return true when arguments are: { "name": "jack", "age": 20, "shirt_size": "L"}, ["L", "jack"]', function() {
        assert.ok(_.includesAll({ "name": "jack", "age": 20, "shirt_size": "L" }, ["L", "jack"]),
            '{ "name": "jack", "age": 20, "shirt_size": "L"} includes all of: ["L", "jack"]');
    });

    it('should return false when arguments are: { "name": "jack", "age": 20}, "jack", 1', function() {
        assert.ok(!_.includesAll({ "name": "jack", "age": 20}, "jack", 1),
            '{ "age": 20} does not include all of: "jack"');
    });

    it('should return true when arguments are: { "name": "jack", "age": 20}, 20, 1', function() {
        assert.ok(_.includesAll({ "name": "jack", "age": 20}, 20, 1), '{ "age": 20} includes all of: 20');
    });

    it('should return false when arguments are: { "name": "jack", "address": { "city": "jacksonville", "state": "fl" }}' +
        ', { "city": "jacksonville", "state": "fl" }', function() {
        assert.ok(!_.includesAll({ "name": "jack", "address": { "city": "jacksonville", "state": "fl" }},
            { "city": "jacksonville", "state": "fl" }), '{ "name": "jack", "address": { "city": "jacksonville", "state": "fl" }}' +
                ' does not include all of: { "city": "jacksonville", "state": "fl" }');
    });

    it('should return true when arguments are: { "name": "jack", "address": jackAddress }, jackAddress',
       function() {
        var jackAddress = { "city": "jacksonville", "state": "fl" };
        assert.ok(_.includesAll({ "name": "jack", "address": jackAddress }, jackAddress),
            '{ "name": "jack", "address": jackAddress } includes all of: jackAddress');
    });
});
