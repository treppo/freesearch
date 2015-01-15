var filters = require('../registeredFilters.js')('pre');
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('Recognize marker tests', function () {
    describe('when parse tokens with markers', function () {
        it('it should recognize markers', function () {
            var res = _parser.parse('von 1000 bis 2000 euro kw PS blub km erstZulaßung');

            expect(res.length).toBe(10);
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

            expect(res[8].term).toBe('km');
            expect(res[8].filter.type).toBe(_filterTypes.kmMarker);

            expect(res[9].term).toBe('erstZulaßung');
            expect(res[9].filter.type).toBe(_filterTypes.firstRegistrationMarker);
        });
    });
});