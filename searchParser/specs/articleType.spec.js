var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Article type tests', function () {
    describe('when parse search line with article type', function () {
        it('it should parse to expected article type', function () {
            var res = _parser.parse('BMW blub motorrad');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('motorrad');
            expect(res[2].filter.term).toBe('Bike');
            expect(res[2].filter.type).toBe(_filterTypes.articleType);
            expect(res[2].filter.value).toBe('B');
        });
    });

    describe('when parse search line with multiple article types', function () {
        it('it should parse to expected article types', function () {
            var res = _parser.parse('Bmw blub bike oder fahrzeug');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('bike');
            expect(res[2].filter.term).toBe('Bike');
            expect(res[2].filter.type).toBe(_filterTypes.articleType);
            expect(res[2].filter.value).toBe('B');

            expect(res[4].term).toBe('fahrzeug');
            expect(res[4].filter.term).toBe('Car');
            expect(res[4].filter.type).toBe(_filterTypes.articleType);
            expect(res[4].filter.value).toBe('C');
        });
    });
});
