var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('Recognize real search string', function () {
    it('it should assign expected values var 1', function () {
        var res = _parser.parse('1000 2000 € bis 200 KW blub ab 100000 km');

        expect(res.length).toBe(4);
        expect(res[0].term).toBe('1000 - 2000');
        expect(res[0].filter.type).toBe(_filterTypes.price);
        expect(res[0].filter.termFrom).toBe('1000');
        expect(res[0].filter.valueFrom).toBe(1000);
        expect(res[0].filter.termTo).toBe('2000');
        expect(res[0].filter.valueTo).toBe(2000);

        expect(res[1].term).toBe('200');
        expect(res[1].filter.type).toBe(_filterTypes.power);
        expect(res[1].filter.termFrom).toBeUndefined();
        expect(res[1].filter.valueFrom).toBeUndefined();
        expect(res[1].filter.termTo).toBe('200');
        expect(res[1].filter.valueTo).toBe(200);

        expect(res[2].term).toBe('blub');
        expect(res[2].filter.type).toBe(_filterTypes.unknown);

        expect(res[3].term).toBe('100000');
        expect(res[3].filter.type).toBe(_filterTypes.mileage);
        expect(res[3].filter.termFrom).toBe('100000');
        expect(res[3].filter.valueFrom).toBe(100000);
        expect(res[3].filter.termTo).toBeUndefined();
        expect(res[3].filter.valueTo).toBeUndefined();
    });

    it('it should assign expected values var 1', function () {
        var res = _parser.parse('audi 1000 2000 € Zulassung von 2000 bis 2014');

        expect(res.length).toBe(3);

        expect(res[1].term).toBe('1000 - 2000');
        expect(res[1].filter.type).toBe(_filterTypes.price);
        expect(res[1].filter.termFrom).toBe('1000');
        expect(res[1].filter.valueFrom).toBe(1000);
        expect(res[1].filter.termTo).toBe('2000');
        expect(res[1].filter.valueTo).toBe(2000);

        expect(res[2].term).toBe('2000 - 2014');
        expect(res[2].filter.type).toBe(_filterTypes.firstRegistration);
        expect(res[2].filter.valueFrom).toBe(2000);
        expect(res[2].filter.termFrom).toBe('2000');
        expect(res[2].filter.valueTo).toBe(2014);
        expect(res[2].filter.termTo).toBe('2014');
    });
});