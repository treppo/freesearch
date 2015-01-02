var filters = require('../registeredFilters.js')();
var parser = require('../parser.js')(filters);

var _findHelper = require('../statics/findHelper.js')();
var _filterTypes = require('../statics/filterTypes.js')();

describe('Price tests', function () {
    describe('When parse a suitable number', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse integer price and currency token', function () {
        it('it should remove the currency token', function () {
            var res = parser.parse('audi 2000 €');
            expect(res.length).toBe(2);
        });
    });

    describe('When parse a double number', function () {
        it('it should convert it to integer', function () {
            var res = parser.parse('audi 2000.30 €');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000.30');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000.30');
        });
    });

    describe('When parse a number with a price marker', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000€');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000€');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as price (due max range)', function () {
            var res = parser.parse('audi ' + (_findHelper.ranges.maxPrice + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.price);
        });
    });

    describe('When parse a number outside of suitable range but the number contains a price marker', function () {
        it('it should be parsed as price', function () {
            var expectedPrice = _findHelper.ranges.maxPrice + 10;
            var expectedTerm = expectedPrice + '€';
            var res = parser.parse('audi ' + expectedTerm);

            expect(res.length).toBe(2);
            expect(res[1].term).toBe(expectedTerm);
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(expectedPrice);
            expect(res[1].filter.termFrom).toBe('' + expectedPrice);
        });

        xit('it should be parsed as price', function () {
            var res = parser.parse('audi 20 30 euro');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('20 - 30');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(20);
            expect(res[1].filter.termFrom).toBe('20');
            expect(res[1].filter.valueTo).toBe(30);
            expect(res[1].filter.termTo).toBe('30')
        });
    });

    describe('When parse two prices', function () {
        it('it should parse them as a price range', function () {
            var res = parser.parse('audi 2000 - 3000');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('2000 - 3000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBe(3000);
            expect(res[1].filter.termTo).toBe('3000');
        });

        it('and prices are on the contrary order, it should parse them as a price range', function () {
            var res = parser.parse('audi 3000 2000');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('2000 - 3000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBe(3000);
            expect(res[1].filter.termTo).toBe('3000');
        });
    });

    describe('When parse more than two prices', function () {
        it('it should parse them as a price range', function () {
            var res = parser.parse('2000 3000 4000 bla blub');

            expect(res.length).toBe(4);

            expect(res[0].term).toBe('2000 - 3000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBe(3000);
            expect(res[0].filter.termTo).toBe('3000');

            expect(res[1].term).toBe('4000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(4000);
            expect(res[1].filter.termFrom).toBe('4000');
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('it should parse them as a price range', function () {
            var res = parser.parse('2000 3000 5000 4000 ');

            expect(res.length).toBe(2);

            expect(res[0].term).toBe('2000 - 3000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBe(3000);
            expect(res[0].filter.termTo).toBe('3000');

            expect(res[1].term).toBe('4000 - 5000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(4000);
            expect(res[1].filter.termFrom).toBe('4000');
            expect(res[1].filter.valueTo).toBe(5000);
            expect(res[1].filter.termTo).toBe('5000');
        });
    });
});