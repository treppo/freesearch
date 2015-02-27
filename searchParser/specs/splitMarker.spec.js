var createTokensFilter = require('../filters/createTokensFilter')();
var splitMarkerFromTokensFilter = require('../filters/splitMarkerFromTokensFilter')();
var _parser = require('../parser')([
    createTokensFilter,
    splitMarkerFromTokensFilter
]);

describe('Split marker tests', function () {
    describe('when parse tokens without markers', function () {
        it('it should change nothing', function () {
            var res = _parser.parse('bmw audi blub');

            expect(res.length).toBe(3);
        });
    });

    describe('when parse tokens with markers', function () {
        it('it should split merged tokens', function () {
            var res = _parser.parse('bmw audi Blub€ 124PS 124euro');

            expect(res.length).toBe(8);
            expect(res[2]).toBe('Blub');
            expect(res[3]).toBe('€');

            expect(res[4]).toBe('124');
            expect(res[5]).toBe('PS');

            expect(res[6]).toBe('124');
            expect(res[7]).toBe('euro');
        });

        it('it should not change alone markers', function () {
            var res = _parser.parse('bmw audi blub €');

            expect(res.length).toBe(4);
            expect(res[2]).toBe('blub');
            expect(res[3]).toBe('€');
        });
    });
});