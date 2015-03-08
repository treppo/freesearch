var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Picture and Video tests', function () {
    describe('when parse search line with picture', function () {
        it('it should parse to expected picture type', function () {
            var res = _parser.parse('Audi blub mit bildern');

            expect(res.length).toBe(4);
            expect(res[3].term).toBe('bildern');
            expect(res[3].filter.term).toBe('Picture');
            expect(res[3].filter.type).toBe(_filterTypes.pictureAndVideo);
            expect(res[3].filter.value).toBe('P');
        });
    });

    describe('when parse search line with video', function () {
        it('it should parse to expected video type', function () {
            var res = _parser.parse('Audi blub mit video');

            expect(res.length).toBe(4);
            expect(res[3].term).toBe('video');
            expect(res[3].filter.term).toBe('Video');
            expect(res[3].filter.type).toBe(_filterTypes.pictureAndVideo);
            expect(res[3].filter.value).toBe('V');
        });
    });

    describe('when parse search line with picture and video', function () {
        it('it should parse to expected picture and video types', function () {
            var res = _parser.parse('Audi blub mit video und bildern');

            expect(res.length).toBe(6);

            expect(res[3].term).toBe('video');
            expect(res[3].filter.term).toBe('Video');
            expect(res[3].filter.type).toBe(_filterTypes.pictureAndVideo);
            expect(res[3].filter.value).toBe('V');

            expect(res[5].term).toBe('bildern');
            expect(res[5].filter.term).toBe('Picture');
            expect(res[5].filter.type).toBe(_filterTypes.pictureAndVideo);
            expect(res[5].filter.value).toBe('P');
        });
    });
});
