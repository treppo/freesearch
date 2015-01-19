var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('equipment tests', function () {
    describe('when parse search line with equipment', function () {
        it('it should parse to expected equipment type', function () {
            var res = _parser.parse('Audi blub abs');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('abs');
            expect(res[2].filter.term).toBe('ABS');
            expect(res[2].filter.type).toBe(_filterTypes.equipment);
            expect(res[2].filter.value).toBe('1');
        });
    });

    describe('when parse search line with multiple equipment types', function () {
        it('it should parse to expected equipment types', function () {
            var res = _parser.parse('Audi blub cd und Klima');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('cd');
            expect(res[2].filter.term).toBe('CdPlayer');
            expect(res[2].filter.type).toBe(_filterTypes.equipment);
            expect(res[2].filter.value).toBe('132');

            expect(res[4].term).toBe('Klima');
            expect(res[4].filter.term).toBe('AirConditioning');
            expect(res[4].filter.type).toBe(_filterTypes.equipment);
            expect(res[4].filter.value).toBe('5');
        });
    });
});
