'use strict';
var make;

module.exports = function (file) {
    if (make) {
        return make;
    }

    var utilHelper = require('../statics/utilHelper')();
    var path = require('path');
    var fs = require('fs');
    var f = file || path.join(__dirname, '../data/make.json');

    try {
        var t = fs.readFileSync(f, 'utf8');
        make = JSON.parse(t);
        make = utilHelper.createServiceTerms(make);

        return make;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};