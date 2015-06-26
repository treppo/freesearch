var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Recognize real search string', function () {
    it('it should assign expected values var 1', function () {
        var res = _parser.parse('1000 2000 € bis 200 KW blub ab 100000 km');

        expect(res[0].term).toBe('1000 - 2000');
        expect(res[0].filter.type).toBe(_filterTypes.price);
        expect(res[0].filter.termFrom).toBe('1000');
        expect(res[0].filter.valueFrom).toBe(1000);
        expect(res[0].filter.termTo).toBe('2000');
        expect(res[0].filter.valueTo).toBe(2000);

        expect(res[3].term).toBe('200');
        expect(res[3].filter.type).toBe(_filterTypes.power);
        expect(res[3].filter.termFrom).toBeUndefined();
        expect(res[3].filter.valueFrom).toBeUndefined();
        expect(res[3].filter.termTo).toBe('200');
        expect(res[3].filter.valueTo).toBe(200);

        expect(res[5].term).toBe('blub');
        expect(res[5].filter.type).toBe(_filterTypes.unknown);

        expect(res[7].term).toBe('100000');
        expect(res[7].filter.type).toBe(_filterTypes.mileage);
        expect(res[7].filter.termFrom).toBe('100000');
        expect(res[7].filter.valueFrom).toBe(100000);
        expect(res[7].filter.termTo).toBeUndefined();
        expect(res[7].filter.valueTo).toBeUndefined();
    });

    it('it should assign expected values var 1', function () {
        var res = _parser.parse('audi 1000 2000 € Zulassung von 2000 bis 2014');

        expect(res[1].term).toBe('1000 - 2000');
        expect(res[1].filter.type).toBe(_filterTypes.price);
        expect(res[1].filter.termFrom).toBe('1000');
        expect(res[1].filter.valueFrom).toBe(1000);
        expect(res[1].filter.termTo).toBe('2000');
        expect(res[1].filter.valueTo).toBe(2000);

        expect(res[5].term).toBe('2000 - 2014');
        expect(res[5].filter.type).toBe(_filterTypes.firstRegistration);
        expect(res[5].filter.valueFrom).toBe(2000);
        expect(res[5].filter.termFrom).toBe('2000');
        expect(res[5].filter.valueTo).toBe(2014);
        expect(res[5].filter.termTo).toBe('2014');
    });
});

describe('Parse mercedes models without space', function () {
    it('it should recognize the model ce220 as "ce 220"', function () {
        var res = _parser.parse('merc ce220');

        expect(res[1].term).toBe('ce220');
        expect(res[1].filter.type).toBe(_filterTypes.model);
        expect(res[1].filter.term).toBe('CE 220');
        expect(res[1].filter.value.modelId).toBe('20240');
    });
});