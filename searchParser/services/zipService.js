'use strict';
var zip;

module.exports = function (file) {
    'use strict';
    if (zip) {
        return zip;
    }

    var _utilHelper = require('../statics/utilHelper')();
    if (_utilHelper.isQuickTestMode()) {
        zip = _utilHelper.transformToObject([
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
        zip = _utilHelper.transformToObject(JSON.parse(t));

        return zip;
    }
    catch (e) {
        console.log(e);
        throw e;
    }

    //var zip;
    //fs.readFile(f, 'utf8', function (err, data) {
    //    if (err) throw err;
    //    zip = JSON.parse(data);
    //});
    //
    //return zip;
};