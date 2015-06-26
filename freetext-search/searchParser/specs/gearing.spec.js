var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Gearing tests', function () {
    describe('when parse search line with gearing', function () {
        it('it should parse to expected gearing type', function () {
            var res = _parser.parse('Audi blub automatik');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('automatik');
            expect(res[2].filter.term).toBe('Automatic');
            expect(res[2].filter.type).toBe(_filterTypes.gearing);
            expect(res[2].filter.value).toBe('A');
        });
    });

    describe('when parse search line with multiple gearing types', function () {
        it('it should parse to expected gearing types', function () {
            var res = _parser.parse('Audi blub Schaltgetriebe oder halbautomatik');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('Schaltgetriebe');
            expect(res[2].filter.term).toBe('ManualTransmission');
            expect(res[2].filter.type).toBe(_filterTypes.gearing);
            expect(res[2].filter.value).toBe('M');

            expect(res[4].term).toBe('halbautomatik');
            expect(res[4].filter.term).toBe('Semiautomatic');
            expect(res[4].filter.type).toBe(_filterTypes.gearing);
            expect(res[4].filter.value).toBe('S');
        });
    });
});
