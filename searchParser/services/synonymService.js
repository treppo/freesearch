'use strict';

var s = {};

// Marker
s.From = ['von', 'vom', 'ab', 'seit'];
s.To = ['bis'];
s.Kw = ['kw'];
s.Ps = ['ps'];
s.Euro = ['€', 'euro', 'eur'];
s.Km = ['km', 'kilometer'];

// Make
s.Mercedes = ['mercedes', 'mers', 'merc', 'benz', 'benc'];
s.Volkswagen = ['volkswagen', 'vw'];

// Model
//syns.Golf = ['golf'];
s.Cross = ['cross'];

// First Registration
s.FirstRegistration = ['erstzulassung', 'zulassung', 'erstzulaßung', 'zulaßung'];

// Fuel
s.Diesel = ['diesel', 'diesl'];
s.Benzin = ['benzin', 'benziner'];

// Body Type
s.Compact = ['kleinwagen'];
s.Cabrio = ['cabrio', 'kabrio'];
s.Coupe = ['coupe', 'cupe', 'kupe', 'koupe'];
s.SUV = ['suv', 'geländewagen'];
s.Sedan = ['sedan', 'limousine'];
s.Van = ['van'];
s.Transporter = ['transporter'];

// Gearing Type
s.ManualTransmission = ['schaltgetriebe'];
s.Automatic = ['automatik'];
s.Semiautomatic = ['halbautomatik'];

// Equipment
s.ABS = ['abs'];
s.Radio = ['radio'];
s.CdPlayer = ['cd'];
s.AirConditioning = ['klima', 'klimaanlage'];
s.AlloyWheels = ['alu', 'alufelgen'];

// Customer Type
s.Private = ['private', 'privat'];
s.Dealer = ['händler', 'haendler', 'dealer'];

// Article Type
s.Car = ['wagen', 'fahrzeug'];
s.Bike = ['motorrad', 'bike'];

// Body Color
s.Beige = ['beige'];
s.Blue = ['blau'];
s.Brown = ['braun'];
s.Bronze = ['bronze'];
s.Yellow = ['gelb'];
s.Grey = ['grau'];
s.Green = ['grün', 'gruen'];
s.Red = ['rot'];
s.Black = ['schwarz'];
s.Silver = ['silber'];
s.Violet = ['violett', 'violet'];
s.White = ['weiß', 'weiss'];
s.Orange = ['orange'];
s.Gold = ['gold'];

// Color effects
s.Metallic = ['metallic', 'metalic'];

// Article Offer Type
s.Jahreswagen = ['jahreswagen'];
s.Demonstration = ['demo', 'demonstration'];
s.Oldtimer = ['oldtimer'];
s.UsedCar = ['gebraucht'];
s.NewCar = ['neu'];
s.SingleDay = ['tageszulassung', 'tageszulaßung'];

// Usage state
s.AccidentedCar = ['unfallfahrzeug', 'unfall'];
s.WreckCar = ['wrack'];

// Seat
s.Seat = ['sitze', 'sitz', 'sitzer'];

// Door
s.Door = ['türe', 'tuere', 'türen', 'tueren', 'türer', 'tuerer'];

// Previous Owner
s.PrevOwner = ['hand', 'vorbesizter', 'halter', 'fahrzeughalter'];

// Online since
s.OnlineSince = ['online', 'eingestellt', 'aktive'];
s.Day = ['tag', 'tagen'];
s.Week = ['woche', 'wochen'];
s.Yesterday = ['gestern'];
s.DayBeforeYesterday = ['vorgestern'];

// Picture / Video
s.Picture = ['bild', 'bilder', 'bildern'];
s.Video = ['video', 'videos'];


var getSynonyms = function (synKey) {
    if (s[synKey]) {
        return s[synKey];
    }
    return [synKey.toLowerCase()];
};

var isSynonym = function (term, synonym) {
    return term.toLowerCase() === synonym;
};

var isSynonymFor = function (synKey, term) {
    return getSynonyms(synKey).some(function (synonym) {
        return isSynonym(term, synonym);
    });
};

var splitAtPos = function (str, pos) {
    var left = str.substring(0, pos);
    var right = str.substring(pos);

    return [left, right];
};

var splitEndsWithSynonym = function (synKey, term) {
    var res = {
        found: false
    };
    var termLower = term.toLowerCase();

    getSynonyms(synKey).some(function (synonym) {
        if (synonym.length >= termLower.length) {
            return false;
        }

        var pos = termLower.indexOf(synonym, termLower.length - synonym.length);
        if (pos > -1) {
            res.found = true;
            res.terms = splitAtPos(term, pos);
            return true;
        }
        return false;
    });

    return res;
};


module.exports.isSynonymFor = isSynonymFor;
module.exports.splitEndsWithSynonym = splitEndsWithSynonym;

var transformArrToObject = function(arr) {
    var t = {};
    arr.forEach(function(elem) {
        t[elem.toLowerCase()] = 1;
    });

    return t;
};

var initSynonyms = function () {
    var t = {};

    // Marker
    t.From = transformArrToObject(['von', 'vom', 'ab', 'seit']);
    t.To = transformArrToObject(['bis']);
    t.Kw = transformArrToObject(['kw']);
    t.Ps = transformArrToObject(['ps']);
    t.Euro = transformArrToObject(['€', 'euro', 'eur']);
    t.Km = transformArrToObject(['km', 'kilometer']);

    // Make
    t.Mercedes = transformArrToObject(['mercedes', 'mers', 'merc', 'benz', 'benc']);
    t.Volkswagen = transformArrToObject(['volkswagen', 'vw']);

    // Model
    //s.Golf = transformArrToObject(['golf']);
    t.Cross = transformArrToObject(['cross']);

    // First Registration
    t.FirstRegistration = transformArrToObject(['erstzulassung', 'zulassung', 'erstzulaßung', 'zulaßung']);

    // Fuel
    t.Diesel = transformArrToObject(['diesel', 'diesl']);
    t.Benzin = transformArrToObject(['benzin', 'benziner']);

    // Body Type
    t.Compact = transformArrToObject(['kleinwagen']);
    t.Cabrio = transformArrToObject(['cabrio', 'kabrio']);
    t.Coupe = transformArrToObject(['coupe', 'cupe', 'kupe', 'koupe']);
    t.SUV = transformArrToObject(['suv', 'geländewagen']);
    t.Sedan = transformArrToObject(['sedan', 'limousine']);
    t.Van = transformArrToObject(['van']);
    t.Transporter = transformArrToObject(['transporter']);

    // Gearing Type
    t.ManualTransmission = transformArrToObject(['schaltgetriebe']);
    t.Automatic = transformArrToObject(['automatik']);
    t.Semiautomatic = transformArrToObject(['halbautomatik']);

    // Equipment
    t.ABS = transformArrToObject(['abs']);
    t.Radio = transformArrToObject(['radio']);
    t.CdPlayer = transformArrToObject(['cd']);
    t.AirConditioning = transformArrToObject(['klima', 'klimaanlage']);
    t.AlloyWheels = transformArrToObject(['alu', 'alufelgen']);

    // Customer Type
    t.Private = transformArrToObject(['private', 'privat']);
    t.Dealer = transformArrToObject(['händler', 'haendler', 'dealer']);

    // Article Type
    t.Car = transformArrToObject(['wagen', 'fahrzeug']);
    t.Bike = transformArrToObject(['motorrad', 'bike']);

    // Body Colora
    t.Beige = transformArrToObject(['beige']);
    t.Blue = transformArrToObject(['blau']);
    t.Brown = transformArrToObject(['braun']);
    t.Bronze = transformArrToObject(['bronze']);
    t.Yellow = transformArrToObject(['gelb']);
    t.Grey = transformArrToObject(['grau']);
    t.Green = transformArrToObject(['grün', 'gruen']);
    t.Red = transformArrToObject(['rot']);
    t.Black = transformArrToObject(['schwarz']);
    t.Silver = transformArrToObject(['silber']);
    t.Violet = transformArrToObject(['violett', 'violet']);
    t.White = transformArrToObject(['weiß', 'weiss']);
    t.Orange = transformArrToObject(['orange']);
    t.Gold = transformArrToObject(['gold']);

    // Color effects
    t.Metallic = transformArrToObject(['metallic', 'metalic']);

    // Article Offer Type
    t.Jahreswagen = transformArrToObject(['jahreswagen']);
    t.Demonstration = transformArrToObject(['demo', 'demonstration']);
    t.Oldtimer = transformArrToObject(['oldtimer']);
    t.UsedCar = transformArrToObject(['gebraucht']);
    t.NewCar = transformArrToObject(['neu']);
    t.SingleDay = transformArrToObject(['tageszulassung', 'tageszulaßung']);

    // Usage state
    t.AccidentedCar = transformArrToObject(['unfallfahrzeug', 'unfall']);
    t.WreckCar = transformArrToObject(['wrack']);

    // Seat
    t.Seat = transformArrToObject(['sitze', 'sitz', 'sitzer']);

    // Door
    t.Door = transformArrToObject(['türe', 'tuere', 'türen', 'tueren', 'türer', 'tuerer']);

    // Previous Owner
    t.PrevOwner = transformArrToObject(['hand', 'vorbesizter', 'halter', 'fahrzeughalter']);

    // Online since
    t.OnlineSince = transformArrToObject(['online', 'eingestellt', 'aktive']);
    t.Day = transformArrToObject(['tag', 'tagen']);
    t.Week = transformArrToObject(['woche', 'wochen']);
    t.Yesterday = transformArrToObject(['gestern']);
    t.DayBeforeYesterday = transformArrToObject(['vorgestern']);

    // Picture / Video
    t.Picture = transformArrToObject(['bild', 'bilder', 'bildern']);
    t.Video = transformArrToObject(['video', 'videos']);

    return t;
};

var syn;
var keys;

if (! syn) {
    syn = initSynonyms();
    keys = Object.keys(syn);
}

var getSynonym = function (val) {
    var s;
    val = val.toLowerCase();
    keys.some(function(key) {
        var synObj = syn[key];

        if (synObj[val]) {
            s = key;
            return true;
        }
    });

    if (s) return s;

    // nothing found, val to lower, first char to upper case
    s = val.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
};

module.exports.getSynonym = getSynonym;