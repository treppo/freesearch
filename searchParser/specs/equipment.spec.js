var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('equipment tests', function () {
    describe('when parse search line with equipment', function () {
        it('it should parse to expected equipment type', function () {
            var res = _parser.parse('Audi blub abs');

            expect(res[2].term).toBe('abs');
            expect(res[2].filter.term).toBe('ABS');
            expect(res[2].filter.type).toBe(_filterTypes.equipment);
            expect(res[2].filter.value).toBe('1');
        });
    });

    describe('when parse search line with multiple equipment types', function () {
        it('it should parse to expected equipment types', function () {
            var res = _parser.parse('Audi blub mit cd Klima servo und bordcomputer');

            expect(res[3].term).toBe('cd');
            expect(res[3].filter.term).toBe('CdPlayer');
            expect(res[3].filter.type).toBe(_filterTypes.equipment);
            expect(res[3].filter.value).toBe('132');

            expect(res[4].term).toBe('Klima');
            expect(res[4].filter.term).toBe('AirConditioning');
            expect(res[4].filter.type).toBe(_filterTypes.equipment);
            expect(res[4].filter.value).toBe('5');

            expect(res[5].term).toBe('servo');
            expect(res[5].filter.term).toBe('Power_steering');
            expect(res[5].filter.type).toBe(_filterTypes.equipment);
            expect(res[5].filter.value).toBe('12');
        });

        it('it should parse to expected equipment types', function () {
            var res = _parser.parse('bordcomputer hu/au');

            expect(res[0].term).toBe('bordcomputer');
            expect(res[0].filter.term).toBe('On-board_computer');
            expect(res[0].filter.type).toBe(_filterTypes.equipment);
            expect(res[0].filter.value).toBe('41');

            expect(res[1].term).toBe('hu/au');
            expect(res[1].filter.term).toBe('HU/AU');
            expect(res[1].filter.type).toBe(_filterTypes.equipment);
            expect(res[1].filter.value).toBe('120');
        });
    });
});
