var filters = require('../registeredFilters.js')();
var parser = require('../parser.js')(filters);

var _findHelper = require('../statics/findHelper.js')();
var _utilHelper = require('../statics/utilHelper.js')();
var _filterTypes = require('../statics/filterTypes.js')();

describe('Power tests', function () {
    var kw200 = _utilHelper.convertFromPsToKw(200);
    var kw300 = _utilHelper.convertFromPsToKw(300);
    var kw400 = _utilHelper.convertFromPsToKw(400);
    var kw500 = _utilHelper.convertFromPsToKw(500);


    describe('When parse a suitable number', function () {
        it('it should find the power in kw (default)', function () {
            var res = parser.parse('audi 150');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('150');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(111);
            expect(res[1].filter.termFrom).toBe('111');
        });
    });

    describe('When parse an integer and power marker', function () {
        it('it should remove the power marker', function () {
            var res = parser.parse('audi 50 PS');
            expect(res.length).toBe(2);
        });
    });

    describe('When parse power with a power marker as part of token', function () {
        it('it should find the power', function () {
            var res = parser.parse('audi 150KW');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('150KW');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(150);
            expect(res[1].filter.termFrom).toBe('150');
        });

        it('it should find the power in ps (default)', function () {
            var res = parser.parse('audi 150PS');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('150PS');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(111);
            expect(res[1].filter.termFrom).toBe('111');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as power (due max range)', function () {
            var res = parser.parse('audi ' + (_findHelper.ranges.maxPower + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.power);
        });
    });

    describe('When parse a number outside of suitable range but the number contains a power marker', function () {
        it('it should be parsed as power', function () {
            var expectedPower = _findHelper.ranges.maxPower + 10;
            var expectedTerm = expectedPower + 'KW';
            var res = parser.parse('audi ' + expectedTerm);

            expect(res.length).toBe(2);
            expect(res[1].term).toBe(expectedTerm);
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(expectedPower);
            expect(res[1].filter.termFrom).toBe('' + expectedPower);
        });
    });

    describe('When parse two power values', function () {
        it('it should parse them as a power range', function () {
            var res = parser.parse('audi 200 - 300');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('200 - 300');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(kw200);
            expect(res[1].filter.termFrom).toBe('' + kw200);
            expect(res[1].filter.valueTo).toBe(kw300);
            expect(res[1].filter.termTo).toBe('' + kw300);
        });

        it('and power are on the contrary order, it should parse them as a power range', function () {
            var res = parser.parse('audi 300 200');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('200 - 300');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(kw200);
            expect(res[1].filter.termFrom).toBe('' + kw200);
            expect(res[1].filter.valueTo).toBe(kw300);
            expect(res[1].filter.termTo).toBe('' + kw300);
        });
    });

    describe('When parse more than two power values', function () {
        it('it should parse them as a power range', function () {
            var res = parser.parse('200 300 400 bla blub');

            expect(res.length).toBe(4);

            expect(res[0].term).toBe('200 - 300');
            expect(res[0].filter.type).toBe(_filterTypes.power);
            expect(res[0].filter.valueFrom).toBe(kw200);
            expect(res[0].filter.termFrom).toBe('' + kw200);
            expect(res[0].filter.valueTo).toBe(kw300);
            expect(res[0].filter.termTo).toBe('' + kw300);

            expect(res[1].term).toBe('400');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(kw400);
            expect(res[1].filter.termFrom).toBe('' + kw400);
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('it should parse them as a power range', function () {
            var res = parser.parse('200 300 500 400 ');

            expect(res.length).toBe(2);

            expect(res[0].term).toBe('200 - 300');
            expect(res[0].filter.type).toBe(_filterTypes.power);
            expect(res[0].filter.valueFrom).toBe(kw200);
            expect(res[0].filter.termFrom).toBe('' + kw200);
            expect(res[0].filter.valueTo).toBe(kw300);
            expect(res[0].filter.termTo).toBe('' + kw300);

            expect(res[1].term).toBe('400 - 500');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(kw400);
            expect(res[1].filter.termFrom).toBe('' + kw400);
            expect(res[1].filter.valueTo).toBe(kw500);
            expect(res[1].filter.termTo).toBe('' + kw500);
        });
    });

    describe('when parse a numeric value with a power marker', function () {
        it('it should parse the value as power', function () {
            var res = parser.parse('audi 2000 KW');

            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('it should parse the value as power', function () {
            var res = parser.parse('audi 2000 PS');

            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(1491);
            expect(res[1].filter.termFrom).toBe('1491');
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('it should parse the value as power', function () {
            var res = parser.parse('audi 2000 - 3000 kw');

            expect(res[1].term).toBe('2000 - 3000');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBe(3000);
            expect(res[1].filter.termTo).toBe('3000')
        });
    });
});