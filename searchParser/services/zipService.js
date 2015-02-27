module.exports = function (file) {
    'use strict';
    var path = require('path');
    var fs = require('fs');
    var f = file || path.join(__dirname, '../data/plz.json');


    try{
        var ff = fs.readFileSync(f, 'utf8');

        var zip = JSON.parse(ff); // sync
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