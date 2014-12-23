module.exports = function () {
    'use strict';

    var syns = {};
    syns.Mercedes = ['mers', 'merc'];
    syns.Volkswagen = ['vw'];
    syns.Golf = ['golf'];
    syns.Cross = ['cross'];

    var getSynonyms = function(synKey) {
        if (syns[synKey]){
            return syns[synKey];
        }
        return [synKey.toLowerCase()];
    };

    var commpareSynonym = function (searchToken, synonym) {
        return searchToken.toLowerCase() === synonym;
    };

    var hasSynonymFor = function(synKey, searchToken) {
        return getSynonyms(synKey).some(function(synonym){
            return commpareSynonym(searchToken, synonym);
        });
    };

    return {
        hasSynonymFor : hasSynonymFor
    };
};