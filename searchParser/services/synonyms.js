module.exports = function () {
    'use strict';

    var syns = {};
    syns.Mercedes = ['mercedes', 'mers', 'merc', 'benz', 'benc'];
    syns.Volkswagen = ['volkswagen', 'vw'];
    //syns.Golf = ['golf'];
    syns.Cross = ['cross'];
    syns.From = ['von', 'vom'];
    syns.To = ['bis'];
    syns.Kw = ['kw'];
    syns.Ps = ['ps'];
    syns.Euro = ['€', 'euro', 'eur'];

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

    var removeSynonymIfContains = function (synKey, term) {
        var res = {
            found: false
        };
        term = term.toLowerCase();

        getSynonyms(synKey).some(function (synonym) {
            var found = term.indexOf(synonym) > -1;
            if (found) {
                res.found = true;
                res.term = term.replace(synonym, '');
                return true;
            }
            return false;
        });

        return res;
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
        removeSynonymIfContains: removeSynonymIfContains,
        splitEndsWithSynonym: splitEndsWithSynonym
    };
};