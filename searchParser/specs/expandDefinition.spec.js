var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Extend definitions tests', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);
    var utilHelper = require('../statics/utilHelper')();

    describe('When parse a definition', function () {
        it('it should be parsed as sportwagen', function () {
            var serviceTerms = require('../services/definitionService')().sportCar;

            var res = parser.parse('audi sportwagen');
            var length = utilHelper.tokenize(serviceTerms[0].value).length;

            expect(res.length).toBe(length); // because "von 2 bis 2" is merged to only "von bis 2"
            expect(res[0].term).toBe('audi');
            expect(res[0].filter.term).toBe('Audi');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe('9');
        });
    });
});
