module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _parseHelper = require('../statics/findHelper.js')();

    var _makes = [
        { term : 'Audi', value : 9 },
        { term : 'BMW', value: 13 },
        { term : 'Mercedes', value: 47 },
        { term : 'Volkswagen', value: 74 },
    ];

    var filter = function(searchTokens) {
        return _parseHelper.findFilters(searchTokens, _makes, _filterTypes.make);
    };

    //var filter = function(items) {
    //     var res = items.map(function(item, index, array) {
    //            if (item.filter.type === _filterTypes.unknown) {
    //
    //                var found = findMake(item.term);
    //                if (found.length) {
    //                    item.filter.type = _filterTypes.make;
    //                    item.filter.term = found[0].term;
    //                    item.filter.value = found[0].value;
    //                }
    //
    //            }
    //            return item;
    //        });
    //
    //    return res;
    //};
    //
    //var findMake = function(makeTerm) {
    //    var t = _makes.filter(function(make) {
    //        var m = makeTerm.toLowerCase();
    //        if (m === make.term.toLowerCase()) {
    //            return make;
    //        }
    //
    //        var _synonyms = _synonymService.get(make.term);
    //        if (make.term.toLowerCase() in _synonyms) {
    //            if (_synonyms.some(function(syn) { return m === syn })) {
    //                return make;
    //            }
    //        }
    //    });
    //
    //    return t;
    //};
    
    return filter;
};
