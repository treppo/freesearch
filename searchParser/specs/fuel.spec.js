var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('Fuel tests', function () {
    describe('when parse search line with fuel', function () {
        it('it should parse to expected fuel type', function () {
            var res = _parser.parse('Audi blub diesl');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('diesl');
            expect(res[2].filter.term).toBe('Diesel');
            expect(res[2].filter.type).toBe(_filterTypes.fuel);
            expect(res[2].filter.value).toBe('D');
        });
    });

    describe('when parse search line with multiple fuel types', function () {
        it('it should parse to expected fuel types', function () {
            var res = _parser.parse('Audi blub diesl oder benziner');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('diesl');
            expect(res[2].filter.term).toBe('Diesel');
            expect(res[2].filter.type).toBe(_filterTypes.fuel);
            expect(res[2].filter.value).toBe('D');

            expect(res[4].term).toBe('benziner');
            expect(res[4].filter.term).toBe('Benzin');
            expect(res[4].filter.type).toBe(_filterTypes.fuel);
            expect(res[4].filter.value).toBe('B');
        });
    });
});
