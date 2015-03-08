var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Price tests all filters', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number with a price marker', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000 €');

            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse a number with a price marker on the right side', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi € 2000');

            expect(res[2].term).toBe('2000');
            expect(res[2].filter.type).toBe(_filterTypes.price);
            expect(res[2].filter.valueFrom).toBe(2000);
            expect(res[2].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse a number with a price marker on the left side', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000 €');

            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse without range markers', function () {
        it('it should be parsed as price range', function () {
            var res = parser.parse('audi 20 30 euro');

            expect(res.length).toBe(3);
            expect(res[1].term).toBe('20 - 30');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(20);
            expect(res[1].filter.termFrom).toBe('20');
            expect(res[1].filter.valueTo).toBe(30);
            expect(res[1].filter.termTo).toBe('30')
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a ranges', function () {
            var res = parser.parse('von 2000 bis 3000 €');

            expect(res[1].term).toBe('2000 - 3000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBe(3000);
            expect(res[1].filter.termTo).toBe('3000');
        });

        it('and contains from, it should parse them as from term', function () {
            var res = parser.parse('ab 2000 €');

            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to term', function () {
            var res = parser.parse('bis 2000 €');

            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBeUndefined();
            expect(res[1].filter.termFrom).toBeUndefined();
            expect(res[1].filter.valueTo).toBe(2000);
            expect(res[1].filter.termTo).toBe('2000');
        });
    });
});
