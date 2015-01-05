var _parser = require('../parser.js')(
    [
        require('../filters/cleanUpSearchLineFilter.js')(),
        require('../filters/createTokensFilter.js')(),
        require('../filters/splitMarkerFromTokensFilter.js')(),
        require('../filters/createSearchTermsFilter.js')(),
        require('../filters/createMarkerFilter.js')()
    ]
);
var _filterTypes = require('../statics/filterTypes.js')();

describe('Recognize marker tests', function () {
    describe('when parse tokens with markers', function () {
        it('it should split merged tokens', function () {
            var res = _parser.parse('von 1000 bis 2000 euro kw PS');

            expect(res.length).toBe(7);
            expect(res[0].term).toBe('von');
            expect(res[0].filter.type).toBe(_filterTypes.rangeMarker);
            expect(res[0].filter.value).toBe('from');

            expect(res[2].term).toBe('bis');
            expect(res[2].filter.type).toBe(_filterTypes.rangeMarker);
            expect(res[2].filter.value).toBe('to');

            expect(res[4].term).toBe('euro');
            expect(res[4].filter.type).toBe(_filterTypes.priceMarker);
            expect(res[4].filter.value).toBe('euro');

            expect(res[5].term).toBe('kw');
            expect(res[5].filter.type).toBe(_filterTypes.powerMarker);
            expect(res[5].filter.value).toBe('kw');

            expect(res[6].term).toBe('PS');
            expect(res[6].filter.type).toBe(_filterTypes.powerMarker);
            expect(res[6].filter.value).toBe('ps');
        });

    });
});