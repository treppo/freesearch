var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Price tests single filter', function () {
    var underTest = require('../filters/zipFilter')().filter;
    var filters = require('./specsHelper')().combineFilters(underTest);
    var parser = require('../parser')(filters);

    xdescribe('When parse a suitable zip', function () {
        it('it recognize the zip', function () {
            var res = parser.parse('audi 85435');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('85435');
            expect(res[1].filter.type).toBe(_filterTypes.zip);
            //expect(res[1].filter.valueFrom).toBe(2000);
            //expect(res[1].filter.termFrom).toBe('2000');
        });
    });
});

describe('Zip tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    //describe('When parse integer price and currency marker is available', function () {
    //    it('it should remove the currency token', function () {
    //        var res = parser.parse('audi 2000 €');
    //        expect(res.length).toBe(2);
    //    });
    //});
});
