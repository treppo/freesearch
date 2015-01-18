module.exports = function () {
    'use strict';

    var syns = {};

    // Marker
    syns.From = ['von', 'vom', 'ab'];
    syns.To = ['bis'];
    syns.Kw = ['kw'];
    syns.Ps = ['ps'];
    syns.Euro = ['€', 'euro', 'eur'];
    syns.Km = ['km', 'kilometer'];

    // Make
    syns.Mercedes = ['mercedes', 'mers', 'merc', 'benz', 'benc'];
    syns.Volkswagen = ['volkswagen', 'vw'];

    // Model
    //syns.Golf = ['golf'];
    syns.Cross = ['cross'];

    // First registraion
    syns.FirstRegistration = ['erstzulassung', 'zulassung', 'erstzulaßung', 'zulaßung'];


    // Fuel
    syns.Diesel = ['diesel', 'diesl'];
    syns.Benzin = ['benzin', 'benziner'];

    // Body Type
    syns.Compact = ['kleinwagen'];
    syns.Cabrio = ['cabrio', 'kabrio'];
    syns.Coupe = ['coupe', 'cupe', 'kupe', 'koupe'];
    syns.SUV = ['suv', 'geländewagen'];
    syns.Sedan = ['sedan', 'limousine'];
    syns.Van = ['van'];
    syns.Transporter = ['transporter'];

    var getSynonyms = function (synKey) {
        if (syns[synKey]) {
            return syns[synKey];
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