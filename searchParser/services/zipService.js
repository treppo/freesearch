var zip;

module.exports = function (file) {
    'use strict';
    if (zip) {
        return zip;
    }

    var _utilHelper = require('../statics/utilHelper')();
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