var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Usage state tests', function () {
    describe('when parse search line with usage state', function () {
        it('it should parse to expected usage state', function () {
            var res = _parser.parse('Audi blub unfall');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('unfall');
            expect(res[2].filter.term).toBe('AccidentedCar');
            expect(res[2].filter.type).toBe(_filterTypes.usageState);
            expect(res[2].filter.value).toBe('A');
        });
    });

    describe('when parse search line with multiple usage states', function () {
        it('it should parse to expected usage states', function () {
            var res = _parser.parse('Audi blub unfallfahrzeug oder wrack');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('unfallfahrzeug');
            expect(res[2].filter.term).toBe('AccidentedCar');
            expect(res[2].filter.type).toBe(_filterTypes.usageState);
            expect(res[2].filter.value).toBe('A');

            expect(res[4].term).toBe('wrack');
            expect(res[4].filter.term).toBe('WreckCar');
            expect(res[4].filter.type).toBe(_filterTypes.usageState);
            expect(res[4].filter.value).toBe('W');
        });
    });
});
