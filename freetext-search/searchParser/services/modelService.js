// search is greedy, define models with the most count of terms on the top of a group, e.g:
//      Polo R WRC
//      Polo Cross
//      Polo
'use strict';
var model;

// Polo R WRC should be before Polo
var sortByGenericNameCount = function (model) {
    var t = model.map(function (elem) {
        return {
            term: elem.term,
            value: elem.value,
            sort: elem.term.split(' ').length
        };
    });

    t.sort(function (a, b) {
        if (a.sort < b.sort)
            return 1;
        if (a.sort > b.sort)
            return -1;
        return 0;
    });

    return t.map(function (elem) {
        return {
            term: elem.term,
            value: elem.value
        };
    });
};

module.exports = function (file) {
    'use strict';

    if (model) {
        return model;
    }

    var utilHelper = require('../statics/utilHelper')();
    if (utilHelper.isQuickTestMode()) {
        model = sortByGenericNameCount([
            {"term": "KS 100 Typ 514", "value": {"makeId": "50109", "modelId": "71127", "articleType": "B"}},
            {"term": "Cross Golf", "value": {"makeId": "74", "modelId": "20315", "articleType": "C"}},
            {"term": "Golf", "value": {"makeId": "74", "modelId": "2084", "articleType": "C"}},
            {"term": "A4", "value": {"makeId": "9", "modelId": "1626", "articleType": "C"}},
            {"term": "X5", "value": {"makeId": "13", "modelId": "16406", "articleType": "C"}},
            {"term": "100", "value": {"makeId": "62", "modelId": "15959", "articleType": "C"}},
            {"term": "100", "value": {"makeId": "9", "modelId": "1619", "articleType": "C"}},
            {"term": "100", "value": {"makeId": "52", "modelId": "1895", "articleType": "C"}},
            {"term": "Electra", "value": {"makeId": "16", "modelId": "1669", "articleType": "C"}},
            {"term": "CE 220", "value": {"makeId": "47", "modelId": "20240", "articleType": "C"}},
            {"term": "A 3", "value": {"makeId": "50103", "modelId": "52130", "articleType": "B"}},
            {"term": "A3", "value": {"makeId": "9", "modelId": "1624", "articleType": "C"}},
        ]);
        model = utilHelper.createServiceTerms(model);

        return model;
    }

    var path = require('path');
    var fs = require('fs');
    var f = file || path.join(__dirname, '../data/model.json');

    try {
        var t = fs.readFileSync(f, 'utf8');
        model = sortByGenericNameCount(JSON.parse(t));
        model = utilHelper.createServiceTerms(model);

        return model;
    }
    catch (e) {
        console.log(e);
    }
};