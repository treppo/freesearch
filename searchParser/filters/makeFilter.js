module.exports = function () {
    'use strict';

    var _filterTypes = require('../filterTypes.js')();
    var _makes = ['audi', 'bmw', 'mercedes'];
    
    var filter = function(items) {
         var res = items.map(function(item, index, array) {
                if (item.type === _filterTypes.unknown) {
                    if (_makes.indexOf(item.term) > -1) {
                        item.type = _filterTypes.make;
                    }
                }
                return item;
            });
            
        return res;
    };

    return filter;
};
