var city;

module.exports = function (file) {
    'use strict';
    if (city) {
        return city;
    }
    var path = require('path');
    var fs = require('fs');
    var f = file || path.join(__dirname, '../data/city.json');

    try {
        var ff = fs.readFileSync(f, 'utf8');
        city = JSON.parse(ff);

        return city;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};