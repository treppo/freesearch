module.exports = function () {
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
    s.MercedesBenz = ['mercedes', 'mers', 'merc', 'benz', 'benc'];
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

    // Customer Type
    s.Private = ['private'];
    s.Dealer = ['händler', 'dealer'];

    // Body Color
    s.Beige = ["beige"];
    s.Blue = ["blau"];
    s.Brown = ["braun"];
    s.Bronze = ["bronze"];
    s.Yellow = ["gelb"];
    s.Grey = ["grau"];
    s.Green = ["grün", "gruen"];
    s.Red = ["rot"];
    s.Black = ["schwarz"];
    s.Silver = ["silber"];
    s.Violet = ["violett", "violet"];
    s.White = ["weiß", "weiss"];
    s.Orange = ["orange"];
    s.Gold = ["gold"];

    // Article Offer Type
    s.Jahreswagen = ['jahreswagen'];
    s.Demonstration = ['demo', 'demonstration'];
    s.Oldtimer = ['oldtimer'];
    s.UsedCar = ['gebraucht'];
    s.NewCar = ['neu'];
    s.SingleDay = ['tageszulassung', 'tageszulaßung'];

    // Seat
    s.Seat = ['sitze', 'sitz'];

    // Previous Owner
    s.PrevOwner = ['hand', 'vorbesizter', 'halter', 'fahrzeughalter'];

    // Online since
    s.OnlineSince = ['online'];
    s.Day = ['tag', 'tagen'];
    s.Week = ['woche', 'wochen'];
    s.Yesterday = ['gestern'];
    s.DayBeforeYesterday = ['vorgestern'];

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
            found : false
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

    return {
        isSynonymFor: isSynonymFor,
        splitEndsWithSynonym: splitEndsWithSynonym
    };
};