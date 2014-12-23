module.exports = function () {
    'use strict';

    
    var syns = {};
    syns.Mercedes = ['mers', 'merc'];
    syns.Volkswagen = ['vw'];
    syns.Golf = ['golf'];
    syns.Cross = ['cross'];

    var get = function(synKey) {
        if (syns[synKey]){
            return syns[synKey];
        }
        return [synKey.toLowerCase()];
    };

    var hasSynonymFor = function(synKey, searchToken) {
        return get(synKey).some(function(syn){
            return searchToken === syn;
        });
    };

    return {
        get : get,
        hasSynonymFor : hasSynonymFor
    };
};