var filters = require('../registerFilters')();
var parser = require('../parser')(filters);

describe('Creating search tokens', function () {
    var config = require('../config/appConfig');

    describe('When parse search line', function () {
        it('the count of created tokens should not be bigger than defined in config', function () {
            var cnt = config.maxAllowedSearchTokens + 1;

            var searchLine = '';
            for (var i = 0; i < cnt; i++) {
                searchLine += ' ' + 't' + i;
            }

            var res = parser.parse(searchLine);

            expect(res.length).toBe(config.maxAllowedSearchTokens);
        });
    });
});
