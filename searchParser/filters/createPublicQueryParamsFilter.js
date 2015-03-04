module.exports = function (context) {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _getFiltersByType = require('../statics/filterTypes').getFiltersByType;

    var filter = function (searchTokens) {
        if (! context) {
            return searchTokens;
        }

        var query = '';
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.make, 'make');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.model, 'model', function(searchToken) { return searchToken.filter.value.modelId; });
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
        query += createRangeQueryParams(searchTokens, _filterTypes.price, 'pricefrom', 'priceto');
        query += createCommaSeparatedFromRangeQueryParam(searchTokens, _filterTypes.onlineSince, 'adage');
        query += createCommaSeparatedFromRangeQueryParam(searchTokens, _filterTypes.prevOwner, 'prevownersid');
        query += createRangeQueryParams(searchTokens, _filterTypes.seat, 'seatsfrom', 'seatsto');
        query += createRangeQueryParams(searchTokens, _filterTypes.door, 'doorfrom', 'doorto');
        query += createCommaSeparatedQueryParam(searchTokens, _filterTypes.usageState, 'ustate');
        query += processPictureAndVideo(searchTokens);
        query += processZip(searchTokens);
        query += processCity(searchTokens);

        query += processDefaultParameters(searchTokens);

        context.publicQueryParams = query;

        return searchTokens;
    };

    var processPictureAndVideo = function(searchTokens) {
        var query = '';

        var hasPicture = searchTokens.some(function(searchToken) {
            return (searchToken.filter.type === _filterTypes.pictureAndVideo && searchToken.filter.value === 'P')
        });
        if (hasPicture) {
            query += '&pic=True';
        }

        var hasVideo = searchTokens.some(function(searchToken) {
            return (searchToken.filter.type === _filterTypes.pictureAndVideo && searchToken.filter.value === 'V')
        });
        if (hasVideo) {
            query += '&hasvideo=True';
        }

        return query;
    };

    var processZip = function(searchTokens) {
        var query = '';

        var zips = searchTokens.filter(function(searchToken) {
            return (searchToken.filter.type === _filterTypes.zip)
        });
        if (zips.length > 0) {
            query += '&zip=' + zips[0].filter.term + '&zipc=D&zipr=200';
        }

        return query;
    };

    var processCity = function(searchTokens) {
        var query = '';

        var zips = searchTokens.filter(function(searchToken) {
            return (searchToken.filter.type === _filterTypes.city)
        });
        if (zips.length > 0) {
            query += '&zip=' + zips[0].filter.term + '&zipc=D&zipr=200&tloc=Erding';
            query += '&lat=' + roundTo(zips[0].filter.value.lat, 3);
            query += '&lon=' + roundTo(zips[0].filter.value.lon, 3);
        }

        return query;
    };

    var processDefaultParameters = function (searchTokens) {
        //atype=C&pricefrom=1000&ustate=N%2CU
        var query = '';

        if (! searchTokens.some(function(searchToken) {
                return (searchToken.filter.type === _filterTypes.articleType);
            })) {
            query += 'atype=C';
        }

        if (! searchTokens.some(function(searchToken) {
                return (searchToken.filter.type === _filterTypes.price);
            })) {
            if (isBike(searchTokens)) {
                query += '&price=500';
            }
            else {
                query += '&price=1000';
            }
        }

        if (! searchTokens.some(function(searchToken) {
                return (searchToken.filter.type === _filterTypes.usageState);
            })) {
            query += 'ustate=N,U';
        }

        return query;
    };

    var isBike = function(searchTokens) {
        return searchTokens.some(function(searchToken){
            return (
                (searchToken.filter.type === _filterTypes.articleType && searchToken.filter.value === 'B') ||
                (searchToken.filter.type === _filterTypes.model && searchToken.filter.value.articleType === 'B')
            );
        });
    };

    var roundTo = function(value, places) {
        return +(Math.round(value + 'e+' + places)  + 'e-' + places);
    };

    var createCommaSeparatedQueryParam = function (searchTokens, filterType, qp, fncGetValue) {
        var query = '';
        _getFiltersByType(searchTokens, filterType)
            .forEach(function (searchToken) {
                if (fncGetValue) {
                    query += fncGetValue(searchToken) + ',';
                }
                else {
                    query += searchToken.filter.value + ',';
                }
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