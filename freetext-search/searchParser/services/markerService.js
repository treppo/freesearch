'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();

    // term is a reference to synonym object property, which contains all possible values
    t = {
        price: utilHelper.createServiceTerms([{term: 'Euro', value: 'euro'}]),
        range: utilHelper.createServiceTerms([{term: 'From', value: 'from'}, {term: 'To', value: 'to'}]),
        power: utilHelper.createServiceTerms([{term: 'Kw', value: 'kw'}, {term: 'Ps', value: 'ps'}]),
        km: utilHelper.createServiceTerms([{term: 'Km', value: ''}]),
        firstRegistration: utilHelper.createServiceTerms([{term: 'FirstRegistration', value: ''}]),
        seat: utilHelper.createServiceTerms([{term: 'Seat', value: ''}]),
        door: utilHelper.createServiceTerms([{term: 'Door', value: ''}]),
        prevOwner: utilHelper.createServiceTerms([{term: 'PrevOwner', value: ''}]),
        onlineSince: utilHelper.createServiceTerms([
            {term: 'Day', value: 'day'},
            {term: 'Week', value: 'week'},
            {term: 'Yesterday', value: 'yesterday'},
            {term: 'DayBeforeYesterday', value: 'daybeforeyesterday'}
        ])
    };

    return t;
};