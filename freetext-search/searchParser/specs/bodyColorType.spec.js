var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Body color tests', function () {
    describe('when parse search line with body color', function () {
        it('it should parse to expected body color', function () {
            var res = _parser.parse('Audi blub schwarz');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('schwarz');
            expect(res[2].filter.term).toBe('Black');
            expect(res[2].filter.type).toBe(_filterTypes.bodyColor);
            expect(res[2].filter.value).toBe('11');
        });
    });

    describe('when parse search line with multiple body colors', function () {
        it('it should parse to expected body colors', function () {
            var res = _parser.parse('Audi blub gelb oder weiß');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('gelb');
            expect(res[2].filter.term).toBe('Yellow');
            expect(res[2].filter.type).toBe(_filterTypes.bodyColor);
            expect(res[2].filter.value).toBe('5');

            expect(res[4].term).toBe('weiß');
            expect(res[4].filter.term).toBe('White');
            expect(res[4].filter.type).toBe(_filterTypes.bodyColor);
            expect(res[4].filter.value).toBe('14');
        });
    });
});
