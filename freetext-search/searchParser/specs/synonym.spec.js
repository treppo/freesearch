describe('Synonym tests', function () {
    var filters = require('../registerFilters')();
    var _parser = require('../parser')(filters);

    describe('when parse search line with an existing synonym', function () {
        it('it should create synonym property filled with founded synonym', function () {
            var res = _parser.parse('bildern');

            expect(res[0].synonym).toBe('picture');
        });
    });

    describe('when parse search line with a not existing synonym', function () {
        it('it should create synonym property filled original value', function () {
            var res = _parser.parse('notExistingWord');

            expect(res[0].synonym).toBe('notexistingword');
        });
    });
});

describe('Internal synonym tests', function () {
    var _syn = require('../services/synonymService');

    describe('when decorate synonym with models', function () {
        it('it should create synonym objects for short models', function () {
            var s = {};
            var models = [
                {"term": "KS 100 Typ 514", "value": {"makeId": "50109", "modelId": "71127", "articleType": "B"}},
                {"term": "GS 125", "value": {"makeId": "50109", "modelId": "71121", "articleType": "B"}},
                {"term": "125 S", "value": {"makeId": "51526", "modelId": "70598", "articleType": "B"}},
                {"term": "SLK 320", "value": {"makeId": "47", "modelId": "15975", "articleType": "C"}},
                {"term": "KFX 450R", "value": {"makeId": "50055", "modelId": "59648", "articleType": "B"}},
                {"term": "Sting 125", "value": {"makeId": "50060", "modelId": "50804", "articleType": "B"}},
            ];
            _syn.decorateKeysWithModels(s, models);

            expect(s['GS 125']).toEqual({'gs125': 1});
            expect(s['125 S']).toEqual({'125s': 1});
            expect(s['SLK 320']).toEqual({'slk320': 1});
            expect(s['KFX 450R']).toEqual({'kfx450r': 1});

            expect(s['KS 100 Typ 514']).toBeUndefined();
            expect(s['Sting 125']).toBeUndefined();
        });
    });

});