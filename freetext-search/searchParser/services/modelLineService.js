'use strict';
var modelLine;

module.exports = function (file) {
    if (modelLine) {
        return modelLine;
    }

    //var utilHelper = require('../statics/utilHelper')();
    //var path = require('path');
    //var fs = require('fs');
    //var f = file || path.join(__dirname, '../data/modelLine.json');
    //
    //try {
    //    var t = fs.readFileSync(f, 'utf8');
    //    modelLine = JSON.parse(t);
    //    modelLine = utilHelper.createServiceTerms(modelLine);
    //
    //    return modelLine;
    //}
    //catch (e) {
    //    console.log(e);
    //    throw e;
    //}

    var utilHelper = require('../statics/utilHelper')();
//  for all VW added 'alle' and for Roadster
    modelLine = [
        // Alpina
        {term: 'B-Klasse', value: {makeId: '14', modelLineId: '107'}},
        {term: 'D-Klasse', value: {makeId: '14', modelLineId: '108'}},
        {term: 'Roadster alle', value: {makeId: '14', modelLineId: '109'}},

        // BMW
        {term: '1er', value: {makeId: '13', modelLineId: '37'}},
        {term: '2er', value: {makeId: '13', modelLineId: '98'}},
        {term: '3er', value: {makeId: '13', modelLineId: '38'}},
        {term: '4er', value: {makeId: '13', modelLineId: '97'}},
        {term: '5er', value: {makeId: '13', modelLineId: '39'}},
        {term: '6er', value: {makeId: '13', modelLineId: '40'}},
        {term: '7er', value: {makeId: '13', modelLineId: '41'}},
        {term: '8er', value: {makeId: '13', modelLineId: '42'}},
        {term: 'M-Reihe', value: {makeId: '13', modelLineId: '43'}},
        {term: 'X-Reihe', value: {makeId: '13', modelLineId: '44'}},
        {term: 'Z-Reihe', value: {makeId: '13', modelLineId: '45'}},

        // Lexus
        {term: 'GS Serie', value: {makeId: '43', modelLineId: '47'}},
        {term: 'GX Serie', value: {makeId: '43', modelLineId: '48'}},
        {term: 'IS Serie', value: {makeId: '43', modelLineId: '49'}},
        {term: 'LS Serie', value: {makeId: '43', modelLineId: '50'}},
        {term: 'LX Serie', value: {makeId: '43', modelLineId: '51'}},
        {term: 'RX Serie', value: {makeId: '43', modelLineId: '52'}},
        {term: 'SC Serie', value: {makeId: '43', modelLineId: '53'}},

        // Mercedes
        {term: 'A-Klasse', value: {makeId: '47', modelLineId: '54'}},
        {term: 'B Klasse', value: {makeId: '47', modelLineId: '55'}},
        {term: 'CE Klasse', value: {makeId: '47', modelLineId: '57'}},
        {term: 'C Klasse', value: {makeId: '47', modelLineId: '56'}},
        {term: 'CLA Klasse', value: {makeId: '47', modelLineId: '96'}},
        {term: 'CLK Klasse', value: {makeId: '47', modelLineId: '59'}},
        {term: 'CL Klasse', value: {makeId: '47', modelLineId: '58'}},
        {term: 'CLS Klasse', value: {makeId: '47', modelLineId: '60'}},
        {term: 'E Klasse', value: {makeId: '47', modelLineId: '61'}},
        {term: 'G Klasse', value: {makeId: '47', modelLineId: '62'}},
        {term: 'GLA Klasse', value: {makeId: '47', modelLineId: '102'}},
        {term: 'GLK Klasse', value: {makeId: '47', modelLineId: '83'}},
        {term: 'GL Klasse', value: {makeId: '47', modelLineId: '63'}},
        {term: 'ML Klasse', value: {makeId: '47', modelLineId: '64'}},
        {term: 'R Klasse', value: {makeId: '47', modelLineId: '65'}},
        {term: 'S Klasse', value: {makeId: '47', modelLineId: '66'}},
        {term: 'SLK Klasse', value: {makeId: '47', modelLineId: '68'}},
        {term: 'SL Klasse', value: {makeId: '47', modelLineId: '67'}},

        // Porsche
        {term: '911er', value: {makeId: '57', modelLineId: '67'}},

        // VW
        {term: 'Golf alle', value: {makeId: '74', modelLineId: '101'}},
        {term: 'Passat alle', value: {makeId: '74', modelLineId: '100'}},
        {term: 'Polo alle', value: {makeId: '74', modelLineId: '99'}},
        {term: 'T3 alle', value: {makeId: '74', modelLineId: '104'}},
        {term: 'T4 alle', value: {makeId: '74', modelLineId: '105'}},
        {term: 'T5 alle', value: {makeId: '74', modelLineId: '106'}}
    ];

    modelLine = utilHelper.createServiceTerms(modelLine);

    return modelLine;
};