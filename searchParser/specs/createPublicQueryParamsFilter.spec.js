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
/*
http://fahrzeuge.autoscout24.de/?atype=C&make=16396&mmvco=1&model=19688&mmvmk0=16396&mmvmd0=19688&pricefrom=1000&cy=D&ustate=N%2CU&sort=price&dtr=s

http://fahrzeuge.autoscout24.de/?atype=C&make=9,13&model=1626,16406&pricefrom=1000&cy=D&ustate=N%2CU&sort=price&dtr=s
http://fahrzeuge.autoscout24.de/?atype=C&make=13,9&model=1626,16406&pricefrom=1000&cy=D&ustate=N%2CU&sort=price&dtr=s

*/
xdescribe('Test query params for model', function () {
    describe('when one model is available', function () {
        it('it should generate one model query param', function () {
            _parser.parse('audi blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk0=9')).toBeTruthy();
        });
    });

    describe('when three model are available', function () {
        it('it should generate three model query params', function () {
            _parser.parse('audi Volkswagen bmw blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk0=9')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk1=74')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk2=13')).toBeTruthy();
        });
    });

    xdescribe('when no model is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('mmvmk');
        });
    });

    describe('when more than three model are available', function () {
        it('it should generate three model query params', function () {
            _parser.parse('audi Volkswagen Ford bmw  blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk0=9')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk1=74')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'mmvmk2=29')).toBeTruthy();
        });
    });
});