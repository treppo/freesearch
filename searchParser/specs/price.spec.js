var filters = require('../registeredFilters.js')();
var parser = require('../parser.js')(filters);

var _findHelper = require('../statics/findHelper.js')();
var _filterTypes = require('../statics/filterTypes.js')();

describe('Price tests', function () {
    describe('When parse an integer price', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.value).toBe(2000);
            expect(res[1].filter.term).toBe('2000');
        });
    });

    describe('When parse integer price and currency token', function () {
        it('it should remove the currency token', function () {
            var res = parser.parse('audi 2000 €');
            expect(res.length).toBe(2);
        });
    });

    describe('When parse a double price', function () {
        it('it should convert it to integer', function () {
            var res = parser.parse('audi 2000.30 €');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000.30');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.value).toBe(2000);
            expect(res[1].filter.term).toBe('2000.30');
        });
    });

    describe('When parse price with a currency attribute', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000€');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000€');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.value).toBe(2000);
            expect(res[1].filter.term).toBe('2000');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as price (due min range)', function () {
            var res = parser.parse('audi ' + (_findHelper.ranges.minPrice - 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.price);
        });

        it('it should not be parsed as price (due max range)', function () {
            var res = parser.parse('audi ' + (_findHelper.ranges.maxPrice + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.price);
        });
    });

    describe('When parse a number outside of suitable range but the number contains a price attribute', function () {
        it('it should be parsed as price', function () {
            var expectedPrice = _findHelper.ranges.minPrice; // 200
            var expectedTerm = _findHelper.ranges.minPrice + '€'; // 200€
            var res = parser.parse('audi ' + expectedTerm); // audi 200€

            expect(res.length).toBe(2);
            expect(res[1].term).toBe(expectedTerm);
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.value).toBe(expectedPrice);
            expect(res[1].filter.term).toBe('' + expectedPrice);

        });
    });
});