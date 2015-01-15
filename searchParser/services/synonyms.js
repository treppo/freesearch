module.exports = function () {
    'use strict';

    var syns = {};
    syns.Mercedes = ['mercedes', 'mers', 'merc', 'benz', 'benc'];
    syns.Volkswagen = ['volkswagen', 'vw'];
    //syns.Golf = ['golf'];
    syns.Cross = ['cross'];

    syns.From = ['von', 'vom', 'ab'];
    syns.To = ['bis'];
    syns.Kw = ['kw'];
    syns.Ps = ['ps'];
    syns.Euro = ['€', 'euro', 'eur'];
    syns.Km = ['km', 'kilometer'];
    syns.FirstRegistration = ['erstzulassung', 'zulassung', 'erstzulaßung', 'zulaßung'];

    syns.Diesel = ['diesel', 'diesl'];
    syns.Benzin = ['benzin'];

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