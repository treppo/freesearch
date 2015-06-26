'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'Benzin', value: 'B'},
        {term: 'Diesel', value: 'D'},
        {term: 'Gas', value: 'G'},
        {term: 'Autogas', value: 'L'}, // LPG
        {term: 'Erdgas', value: 'C'}, // CNG
        {term: 'Hybrid', value: '2'},
        {term: 'Elektrobenzin', value: 'TODO'},
        {term: 'Elektrodiesel', value: '3'},
        {term: 'Ethanol', value: 'M'},
        {term: 'Electric', value: 'E'}, // Elektro
        {term: 'Hydrogen', value: 'H'} // Wasserstoff
    ];
    t = utilHelper.createServiceTerms(t);

    return t;

    /*
     B	Gasoline
     D	Diesel
     G	Gas
     M	Ethanol
     E	Electric
     H	Hydrogene
     L	LPG
     C	CNG
     2	Hybrid
     O	Others
     3	Hybrid (Electric/Diesel)
     T	Two Stroke Gasoline
     */
};