var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);

describe('when parse garbage symbols in the search line', function () {
    describe('when parse empty search line', function () {
        it('it should parse to empty result', function () {
            var res = _parser.parse('');
            expect(res.length).toBe(0);
        });
    });

    describe('when parse search line with multiple garbage symbols', function () {
        it('it should parse to empty result', function () {
            var res = _parser.parse('   ');
            expect(res.length).toBe(0);
        });

        it('it should parse to empty result', function () {
            var res = _parser.parse('-+ ;   ');
            expect(res.length).toBe(0);
        });

        it('it should parse to tokens without garbage', function () {
            var res = _parser.parse('t1;  t2   ');
            expect(res.length).toBe(2);
        });
    });
});
