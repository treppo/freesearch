'use strict';

var _syn;
var _keys;

var transformArrToObject = function(arr) {
    var t = {};
    arr.forEach(function(elem) {
        t[elem.toLowerCase()] = 1;
    });

    return t;
};

var initSynonyms = function () {
    var s = {};

    // Marker
    s.From = transformArrToObject(['von', 'vom', 'ab', 'seit']);
    s.To = transformArrToObject(['bis']);
    s.Kw = transformArrToObject(['kw']);
    s.Ps = transformArrToObject(['ps']);
    s.Euro = transformArrToObject(['€', 'euro', 'eur']);
    s.Km = transformArrToObject(['km', 'kilometer']);

    // Make
    s.Mercedes = transformArrToObject(['mercedes', 'mers', 'merc', 'benz', 'benc']);
    s.Volkswagen = transformArrToObject(['volkswagen', 'vw']);

    // Model
    //s.Golf = transformArrToObject(['golf']);
    s.Cross = transformArrToObject(['cross']);

    // First Registration
    s.FirstRegistration = transformArrToObject(['erstzulassung', 'zulassung', 'erstzulaßung', 'zulaßung']);

    // Fuel
    s.Diesel = transformArrToObject(['diesel', 'diesl']);
    s.Benzin = transformArrToObject(['benzin', 'benziner']);

    // Body Type
    s.Compact = transformArrToObject(['kleinwagen']);
    s.Cabrio = transformArrToObject(['cabrio', 'kabrio']);
    s.Coupe = transformArrToObject(['coupe', 'cupe', 'kupe', 'koupe']);
    s.SUV = transformArrToObject(['suv', 'geländewagen']);
    s.Sedan = transformArrToObject(['sedan', 'limousine']);
    s.Van = transformArrToObject(['van']);
    s.Transporter = transformArrToObject(['transporter']);

    // Gearing Type
    s.ManualTransmission = transformArrToObject(['schaltgetriebe']);
    s.Automatic = transformArrToObject(['automatik']);
    s.Semiautomatic = transformArrToObject(['halbautomatik']);

    // Equipment
    s.ABS = transformArrToObject(['abs']);
    s.Radio = transformArrToObject(['radio']);
    s.CdPlayer = transformArrToObject(['cd']);
    s.AirConditioning = transformArrToObject(['klima', 'klimaanlage']);
    s.AlloyWheels = transformArrToObject(['alu', 'alufelgen']);

    // Customer Type
    s.Private = transformArrToObject(['private', 'privat']);
    s.Dealer = transformArrToObject(['händler', 'haendler', 'dealer']);

    // Article Type
    s.Car = transformArrToObject(['wagen', 'fahrzeug']);
    s.Bike = transformArrToObject(['motorrad', 'bike']);

    // Body Colora
    s.Beige = transformArrToObject(['beige']);
    s.Blue = transformArrToObject(['blau']);
    s.Brown = transformArrToObject(['braun']);
    s.Bronze = transformArrToObject(['bronze']);
    s.Yellow = transformArrToObject(['gelb']);
    s.Grey = transformArrToObject(['grau']);
    s.Green = transformArrToObject(['grün', 'gruen']);
    s.Red = transformArrToObject(['rot']);
    s.Black = transformArrToObject(['schwarz']);
    s.Silver = transformArrToObject(['silber']);
    s.Violet = transformArrToObject(['violett', 'violet']);
    s.White = transformArrToObject(['weiß', 'weiss']);
    s.Orange = transformArrToObject(['orange']);
    s.Gold = transformArrToObject(['gold']);

    // Color effects
    s.Metallic = transformArrToObject(['metallic', 'metalic']);

    // Article Offer Type
    s.Jahreswagen = transformArrToObject(['jahreswagen']);
    s.Demonstration = transformArrToObject(['demo', 'demonstration']);
    s.Oldtimer = transformArrToObject(['oldtimer']);
    s.UsedCar = transformArrToObject(['gebraucht']);
    s.NewCar = transformArrToObject(['neu']);
    s.SingleDay = transformArrToObject(['tageszulassung', 'tageszulaßung']);

    // Usage state
    s.AccidentedCar = transformArrToObject(['unfallfahrzeug', 'unfall']);
    s.WreckCar = transformArrToObject(['wrack']);

    // Seat
    s.Seat = transformArrToObject(['sitze', 'sitz', 'sitzer']);

    // Door
    s.Door = transformArrToObject(['türe', 'tuere', 'türen', 'tueren', 'türer', 'tuerer']);

    // Previous Owner
    s.PrevOwner = transformArrToObject(['hand', 'vorbesizter', 'halter', 'fahrzeughalter']);

    // Online since
    s.Day = transformArrToObject(['tag', 'tagen']);
    s.Week = transformArrToObject(['woche', 'wochen']);
    s.Yesterday = transformArrToObject(['gestern']);
    s.DayBeforeYesterday = transformArrToObject(['vorgestern']);

    // Picture / Video
    s.Picture = transformArrToObject(['bild', 'bilder', 'bildern']);
    s.Video = transformArrToObject(['video', 'videos']);

    return s;
};

if (! _syn) {
    _syn = initSynonyms();
    _keys = Object.keys(_syn);
}

var getSynonym = function (val) {
    var s;
    val = val.toLowerCase();
    _keys.some(function(key) {
        var synObj = _syn[key];

        if (synObj[val]) {
            s = key.toLowerCase();
            return true;
        }
    });

    if (s)
        return s;

    // nothing found, return original value in lower case
    return val;
};

module.exports.getSynonym = getSynonym;