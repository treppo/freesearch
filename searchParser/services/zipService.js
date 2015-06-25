'use strict';
var zip;

module.exports = function (file) {
    if (zip) {
        return zip;
    }

    var utilHelper = require('../statics/utilHelper')();
    if (utilHelper.isQuickTestMode()) {
        zip = utilHelper.transformToObject([
            {"term": "85435", "value": {"lat": "48.3099111578726", "lon": "11.9184400536846"}},
            {"term": "85445", "value": {"lat": "48.3345248997458", "lon": "11.8249940869151"}}
        ]);

        return zip;
    }

    var path = require('path');
    var fs = require('fs');
    var f = file || path.join(__dirname, '../data/plz.json');

    try {
        var t = fs.readFileSync(f, 'utf8');
        zip = utilHelper.transformToObject(JSON.parse(t));

        return zip;
    }
    catch (e) {
        console.log(e);
    }
};