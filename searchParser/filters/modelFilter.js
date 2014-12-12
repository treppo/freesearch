module.exports = function () {
    'use strict';
    
    var _filterTypes = require('../filterTypes.js')();
    var _models = ['golf', 'cross golf', 'golf plus']
            
    var filter = function(items) {
         var res = items.map(function(item, index, array) {
                if (item.type === _filterTypes.unknown) {
                    if (_models.indexOf(item.term) > -1) {
                        item.type = _filterTypes.model;
                    }
                }
                
                return item;
            });
            
        return res;
    };


    return filter;
};