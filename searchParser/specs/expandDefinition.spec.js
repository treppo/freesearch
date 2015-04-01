var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Extend definitions tests', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number inside of suitable range and the number is followed by a first registration marker', function () {
        it('it should be parsed as first registration', function () {
            var res = parser.parse('audi sportwagen');

            expect(res.length).toBe(5);
        });
    });
});
