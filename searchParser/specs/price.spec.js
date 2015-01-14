var _filterTypes = require('../statics/filterTypes.js')();
var _maxPriceInEuro = 1000000;

describe('Price tests single filter', function () {
    var underTest = require('../filters/priceFilter.js')().filter;
    var filters = require('./specsHelper.js')().combineFilters(underTest);
    var parser = require('../parser.js')(filters);

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

    describe('When parse a double number', function () {
        it('it should convert it to integer', function () {
            var res = parser.parse('audi 2000.30');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000.30');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000.30');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as price (due max range)', function () {
            var res = parser.parse('audi ' + (_maxPriceInEuro + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.price);
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
        it('it should parse them as a price ranges', function () {
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

        it('it should parse them as a price ranges', function () {
            var res = parser.parse('2000 3000 blub 5000 4000 ');

            expect(res.length).toBe(3);

            expect(res[0].term).toBe('2000 - 3000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBe(3000);
            expect(res[0].filter.termTo).toBe('3000');

            expect(res[2].term).toBe('4000 - 5000');
            expect(res[2].filter.type).toBe(_filterTypes.price);
            expect(res[2].filter.valueFrom).toBe(4000);
            expect(res[2].filter.termFrom).toBe('4000');
            expect(res[2].filter.valueTo).toBe(5000);
            expect(res[2].filter.termTo).toBe('5000');
        });
    });
});

describe('Price tests all filters', function () {
    var filters = require('../registeredFilters.js')();
    var parser = require('../parser.js')(filters);

    describe('When parse integer price and currency marker is available', function () {
        it('it should remove the currency token', function () {
            var res = parser.parse('audi 2000 €');
            expect(res.length).toBe(2);
        });
    });

    describe('When parse a number with a price marker', function () {
        it('it should find the price', function () {
            var res = parser.parse('audi 2000€');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse a number outside of suitable range but the number is followed by a price marker', function () {
        it('it should be parsed as price', function () {
            var expectedPrice = _maxPriceInEuro + 10;
            var res = parser.parse('audi ' + expectedPrice + '€');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('' + expectedPrice);
            expect(res[1].filter.type).toBe(_filterTypes.price);
            expect(res[1].filter.valueFrom).toBe(expectedPrice);
            expect(res[1].filter.termFrom).toBe('' + expectedPrice);
        });

        it('it should be parsed as price range', function () {
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

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a ranges', function () {
            var res = parser.parse('von 2000 bis 3000 €');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2000 - 3000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBe(3000);
            expect(res[0].filter.termTo).toBe('3000');
        });

        it('and contains from, it should parse them as from term', function () {
            var res = parser.parse('ab 2000 €');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBeUndefined();
            expect(res[0].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to term', function () {
            var res = parser.parse('bis 2000 €');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueTo).toBe(2000);
            expect(res[0].filter.termTo).toBe('2000');
        });
    });
});
