var _ctx = {};
var filters = require('../registeredFilters.js')(_ctx);
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

var containOnce = function (source, substring) {
    var t = (source.indexOf(substring) > -1);
    if (t) {
        var s = source.replace(substring, '');
        return ! containOnce(s, substring);
    }
    return false;
};

describe('Test query params for make', function () {

    describe('when one make is available', function () {
        it('it should generate one make query param', function () {
            _parser.parse('audi blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk0=9')).toBeTruthy();
        });
    });

    describe('when three makes are available', function () {
        it('it should generate three make query params', function () {
            _parser.parse('audi Volkswagen bmw blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk0=9')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk1=74')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk2=13')).toBeTruthy();
        });
    });

    xdescribe('when no make is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('mmvmk');
        });
    });

    describe('when more than three makes are available', function () {
        it('it should generate three make query params', function () {
            _parser.parse('audi Volkswagen Ford bmw  blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk0=9')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk1=74')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk2=29')).toBeTruthy();
        });
    });
});