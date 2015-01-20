var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('Customer type tests', function () {
    describe('when parse search line with customer type', function () {
        it('it should parse to expected customer type', function () {
            var res = _parser.parse('Audi blub händler');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('händler');
            expect(res[2].filter.term).toBe('Dealer');
            expect(res[2].filter.type).toBe(_filterTypes.customerType);
            expect(res[2].filter.value).toBe('D');
        });
    });

    describe('when parse search line with multiple customer types', function () {
        it('it should parse to expected customer types', function () {
            var res = _parser.parse('Audi blub private oder händler');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('private');
            expect(res[2].filter.term).toBe('Private');
            expect(res[2].filter.type).toBe(_filterTypes.customerType);
            expect(res[2].filter.value).toBe('P');

            expect(res[4].term).toBe('händler');
            expect(res[4].filter.term).toBe('Dealer');
            expect(res[4].filter.type).toBe(_filterTypes.customerType);
            expect(res[4].filter.value).toBe('D');
        });
    });
});
