var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('Filter identical terms tests', function () {
    describe('when parse identical filters', function () {

        it('it should merge them to one', function () {
            var res = _parser.parse('bmw bmw bmw');

            expect(res.length).toBe(1);

            expect(res[0].term).toBe('bmw bmw bmw');
            expect(res[0].filter.term).toBe('BMW');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe(13);
        });

        it('it should merge them to one', function () {
            var res = _parser.parse('merc blub mercedes bluba benz');

            expect(res.length).toBe(3);

            expect(res[0].term).toBe('merc mercedes benz');
            expect(res[0].filter.term).toBe('Mercedes');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe(47);

            expect(res[1].filter.type).toBe('unknown');
            expect(res[2].filter.type).toBe('unknown');
        });

        it('it should merge them to one', function () {
            var res = _parser.parse('vw golf golf golf cross cross');

            expect(res.length).toBe(3);

            expect(res[0].term).toBe('vw');
            expect(res[0].filter.term).toBe('Volkswagen');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe(74);

            expect(res[1].term).toBe('golf cross golf cross');
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.value).toBe(20315);

            expect(res[2].term).toBe('golf');
            expect(res[2].filter.term).toBe('Golf');
            expect(res[2].filter.type).toBe(_filterTypes.model);
            expect(res[2].filter.value).toBe(2084);
        });
    });
});