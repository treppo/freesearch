module.exports = function (context) {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _getFiltersByType = require('../statics/filterTypes').getFiltersByType;

    var filter = function (searchTokens) {
        if (! context) {
            return searchTokens;
        }

        var query = '';
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.make, 'make');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.model, 'model');
        query += createRangeQueryParams(searchTokens, _filterTypes.mileage, 'kmfrom', 'kmto');
        query += createRangeQueryParams(searchTokens, _filterTypes.firstRegistration, 'fregfrom', 'fregto');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.fuel, 'fuel');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.bodyType, 'body');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.equipment, 'eq');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.gearing, 'gear');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.customerType, 'custtype');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.bodyColor, 'bcol');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.colorEffect, 'ptype');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.articleOfferType, 'offer');
        query += createCommaSeparatedFromRangeQueryParam(searchTokens, _filterTypes.onlineSince, 'adage');
        query += createCommaSeparatedFromRangeQueryParam(searchTokens, _filterTypes.prevOwner, 'prevownersid');
        query += createRangeQueryParams(searchTokens, _filterTypes.seat, 'seatsfrom', 'seatsto');
        query += createRangeQueryParams(searchTokens, _filterTypes.door, 'doorfrom', 'doorto');

        context.publicQueryParams = query;

        return searchTokens;
    };

    var createCommaSeparatedQueryParam = function (searchTokens, filterType, qp) {
        var query = '';
        _getFiltersByType(searchTokens, filterType)
            .forEach(function (searchToken) {
                query += searchToken.filter.value + ',';
            });

        return (query) ? removeLastComma('&' + qp+ '=' + query) : query;
    };

    var createRangeQueryParams = function (searchTokens, filterType, qpFrom, qpTo) {
        var query = '';
        _getFiltersByType(searchTokens, filterType)
            .forEach(function (searchToken) {
                if (searchToken.filter.valueFrom) {
                    query += '&' + qpFrom + '='  + searchToken.filter.valueFrom;
                }
                if (searchToken.filter.valueTo) {
                    query += '&' + qpTo + '=' + searchToken.filter.valueTo;
                }
            });

        return (query) ? removeLastComma(query) : query;
    };

    var createCommaSeparatedFromRangeQueryParam = function (searchTokens, filterType, qp) {
        var query = '';
        _getFiltersByType(searchTokens, filterType)
            .forEach(function (searchToken) {
                if (searchToken.filter.valueFrom) {
                    query += searchToken.filter.valueFrom + ',';
                }
                if (searchToken.filter.valueTo) {
                    query += searchToken.filter.valueTo + ',';
                }
            });

        return (query) ? removeLastComma('&' + qp+ '=' + query) : query;
    };

    var removeLastComma = function(str) {
        var t = str.length - 1;
        if (str.charAt(t) == ',') {
            return str.substring(0, t);
        }

        return str;
    };

    return filter;
};