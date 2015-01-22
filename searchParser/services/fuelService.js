module.exports = function () {
    'use strict';

    return [
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