'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
            {term: 'Compact', value: '1'}, // Kleinwagen
            {term: 'Cabrio', value: '2'},
            {term: 'Coupe', value: '3'},
            {term: 'SUV', value: '4'},
            {term: 'Kombi', value: '5'},
            {term: 'Sedan', value: '6'}, // Limousine
            {term: 'Van', value: '12'}, // Van / Kleinbus
            {term: 'Transporter', value: '13'} // Transporter
        ];

    return t;

    /*
     1	Compact	C
     2	Convertible	C
     3	Coupe	C
     4	Off-Road	C
     5	Station Wagon	C
     6	Sedan	C
     7	Other	C
     12	Van	C
     13	Transporter	C
     101	Supersport	B
     102	Sporttourer	B
     103	Chopper/Cruiser	B
     104	Reiseenduro	B
     105	Streetfighter	B
     106	Enduro	B
     108	Motocross	B
     109	Gespann	B
     110	Oldtimer	B
     111	Trike	B
     112	Roller/Scooter	B
     113	Mofa/Moped/Mokick	B
     114	Super Moto	B
     115	Kindermotorrad	B
     116	Sonstige	B
     117	Naked Bike	B
     118	Quad/ATV	B
     119	Rallye	B
     120	Trial	B
     121	Rennsport	B
     122	Tourer	B
     */
};