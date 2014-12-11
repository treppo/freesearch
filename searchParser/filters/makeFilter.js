module.exports = function () {
    'use strict';

    var _makes = ['audi', 'bmw', 'mercedes'];
    
    var filter = function(items) {
        console.log('make filter does ' + items);
                        
         var res = 
            items.filter(function(item, index, array) {
                return item.type === 'unknown';
            })
            .map(function(item, index, array) {
                if (_makes.indexOf(item.term) > -1) {
                    item.type = 'make';
                }
                return item;
            });
            
        return res;
    };

    return filter;
};