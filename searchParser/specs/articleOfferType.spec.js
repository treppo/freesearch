var filters = require('../registeredFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Article offer type tests', function () {
    describe('when parse search line with article offer type', function () {
        it('it should parse to expected article offer type', function () {
            var res = _parser.parse('Audi blub jahreswagen');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('jahreswagen');
            expect(res[2].filter.term).toBe('Jahreswagen');
            expect(res[2].filter.type).toBe(_filterTypes.articleOfferType);
            expect(res[2].filter.value).toBe('J');
        });
    });

    describe('when parse search line with multiple article offer types', function () {
        it('it should parse to expected article offer types', function () {
            var res = _parser.parse('Audi blub gebraucht oder neu');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('gebraucht');
            expect(res[2].filter.term).toBe('UsedCar');
            expect(res[2].filter.type).toBe(_filterTypes.articleOfferType);
            expect(res[2].filter.value).toBe('U');

            expect(res[4].term).toBe('neu');
            expect(res[4].filter.term).toBe('NewCar');
            expect(res[4].filter.type).toBe(_filterTypes.articleOfferType);
            expect(res[4].filter.value).toBe('N');
        });
    });
});
