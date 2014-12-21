module.exports = function () {
    'use strict';

    var _filterTypes = require('./filterTypes.js')();

    // var compare = function (left, right) {
        // return left === right;
    // }
    
    // var findOne = function(what, where) {
        // var res = where.some(function(whereItem) {
            // var found = what.some(function(whatItem) {
                // return whatItem === whereItem;
            // });
            // return found;
        // )};
        
        // return res;
    // };
        
        
    var termToStruct = function (term) {
        var t = term.split(' ');
        return t.map(function(item){
            return {
                term : item,
                done : false
            };
        });
    };

    var getNotDoneTerms = function (terms) {
        return terms.filter(function(term){
            return term.done;
        });
    };

    var getUnknownItems = function(terms) {
        return terms.filter(function(term){
            return term.filter.type === _filterTypes.unknown;
        });
    };


    // Cross Golf  [blub,Cross,Golf,blaba]
    var  findAll = function(what, where) {
        var res = where.some(function(whereItem) {
        
            var found = what.every(function(whatItem) {
                return whatItem === whereItem;
             });
        
            return found;
        });
        
        return res;
    };
    
    return {
        termToStruct : termToStruct,
        findAll : findAll,
        getUnknownItems : getUnknownItems,
        getNotDoneTerms : getNotDoneTerms
    }
};