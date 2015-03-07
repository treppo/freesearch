var filters = require('../registeredFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Synonym tests', function () {
    describe('when parse search line with an existing synonym', function () {
        it('it should create synonym property filled with founded synonym', function () {
            var res = _parser.parse('bildern');

            expect(res[0].synonym).toBe('Picture');
        });
    });

    describe('when parse search line with a not existing synonym', function () {
        it('it should create synonym property filled original value', function () {
            var res = _parser.parse('notExistingWord');

            expect(res[0].synonym).toBe('Notexistingword');
        });
    });
});
