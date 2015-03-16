'use strict';
var city;

module.exports = function (file) {
    'use strict';
    if (city) {
        return city;
    }

    var utilHelper = require('../statics/utilHelper')();
    if (utilHelper.isQuickTestMode()) {
        city = [
            {"term": "Erdhausen", "value": {"lat": "50.75", "lon": "8.5666667"}},
            {"term": "Erding", "value": {"lat": "48.2980807692307692", "lon": "11.9857346153846154"}}
        ];
        return city;
    }

    var path = require('path');
    var fs = require('fs');
    var f = file || path.join(__dirname, '../data/city.json');

    try {
        var t = fs.readFileSync(f, 'utf8');
        city = JSON.parse(t);

        return city;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};