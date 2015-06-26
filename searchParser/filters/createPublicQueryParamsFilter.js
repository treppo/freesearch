'use strict';
module.exports = function (context) {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _getFiltersByType = require('../statics/filterTypes').getFiltersByType;
    var _isMarkerFilter =  require('../statics/filterTypes').isMarkerFilter;
    var _isRangeMarker =  require('../statics/filterTypes').isRangeMarker;
    var _isUnknownFilter =  require('../statics/filterTypes').isUnknownFilter;


    var filter = function (searchTokens) {
        if (! context) {
            return searchTokens;
        }

        var missingMakes = getMissingMakes(searchTokens);

        var query = '';

        var model = createQueryParam(searchTokens, _filterTypes.model, 'model', { fncGetValue: function(searchToken) { return searchToken.filter.value.modelId; } });
        var modelLine = createQueryParam(searchTokens, _filterTypes.modelLine, 'model', { fncGetValue: function(searchToken) { return 0 - parseInt(searchToken.filter.value.modelLineId); } });
        if (modelLine && model) {
            model.split('=');
            modelLine += ',' + model[1];
            query += modelLine;
        }
        else {
            query += modelLine;
            query += model;
        }

        query += createQueryParam(searchTokens, _filterTypes.make, 'make', {defValue: missingMakes});
        query += createRangeQueryParams(searchTokens, _filterTypes.price, 'pricefrom', 'priceto');
        query += createRangeQueryParams(searchTokens, _filterTypes.mileage, 'kmfrom', 'kmto');
        query += createRangeQueryParams(searchTokens, _filterTypes.firstRegistration, 'fregfrom', 'fregto');
        query += createQueryParam(searchTokens, _filterTypes.fuel, 'fuel');
        query += createQueryParam(searchTokens, _filterTypes.bodyType, 'body');
        query += createQueryParam(searchTokens, _filterTypes.equipment, 'eq');
        query += createQueryParam(searchTokens, _filterTypes.gearing, 'gear');
        query += createQueryParam(searchTokens, _filterTypes.customerType, 'custtype');
        query += createQueryParam(searchTokens, _filterTypes.bodyColor, 'bcol');
        query += createQueryParam(searchTokens, _filterTypes.colorEffect, 'ptype');
        query += createQueryParam(searchTokens, _filterTypes.articleOfferType, 'offer');
        query += createCommaSeparatedFromRangeQueryParam(searchTokens, _filterTypes.onlineSince, 'adage');
        query += createCommaSeparatedFromRangeQueryParam(searchTokens, _filterTypes.prevOwner, 'prevownersid');
        query += createRangeQueryParams(searchTokens, _filterTypes.seat, 'seatsfrom', 'seatsto');
        query += createRangeQueryParams(searchTokens, _filterTypes.door, 'doorfrom', 'doorto');
        query += createQueryParam(searchTokens, _filterTypes.usageState, 'ustate');
        query += processPictureAndVideo(searchTokens);
        query += processZip(searchTokens);
        query += processCity(searchTokens);
        query += createQueryParam(searchTokens, _filterTypes.articleType, 'atype');
        //query += createQueryParam(searchTokens, _filterTypes.unknown, 'version', {
        //    separator: ' ',
        //    fncGetValue: function(searchToken) { return searchToken.term; }
        //});

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
            query += '&zip=' + zips[0].filter.term + '&zipc=D';
            query += '&zipr=' + (getGeoRadius(searchTokens) || 200);
        }

        return query;
    };

    var processCity = function(searchTokens) {
        var query = '';

        var zips = searchTokens.filter(function(searchToken) {
            return (searchToken.filter.type === _filterTypes.city)
        });
        if (zips.length > 0) {
            query += '&zip=' + zips[0].filter.term + '&zipc=D&tloc=Erding';
            query += '&zipr=' + (getGeoRadius(searchTokens) || 200);
            query += '&lat=' + roundTo(zips[0].filter.value.lat, 3);
            query += '&lon=' + roundTo(zips[0].filter.value.lon, 3);
        }

        return query;
    };

    var getMissingMakes = function(searchTokens) {
        var makes = searchTokens.filter(function (searchToken) {
            return (searchToken.filter.type === _filterTypes.make);
        }).map(function (searchToken) {
            return searchToken.filter.value;
        });

        var makesFromModels = searchTokens.filter(function (searchToken) {
            return (searchToken.filter.type === _filterTypes.model);
        }).map(function (searchToken) {
            return searchToken.filter.value.makeId;
        });

        var makesFromModelLines = searchTokens.filter(function (searchToken) {
            return (searchToken.filter.type === _filterTypes.modelLine);
        }).map(function (searchToken) {
            return searchToken.filter.value.makeId;
        });

        var allMakes = makesFromModels.concat(makesFromModelLines);

        var qp = allMakes.reduce(function (acc, makeId) { // remove duplicates
            if (acc.indexOf(makeId) < 0) {
                acc.push(makeId);
            }
            return acc;
        }, []).reduce(function (acc, makeId) { // find missed makes
            if (makes.indexOf(makeId) < 0) {
                acc.push(makeId);
            }
            return acc;
        }, []).reduce(function (query, missedMakeId) { // generete query params
            query += missedMakeId + ',';
            return query;
        }, '');

        if (qp)
            return qp;

        return '';
    };

    var processDefaultParameters = function (searchTokens) {
        var query = '';

        var knownTokens = searchTokens.filter(function(searchToken) {
            if (_isMarkerFilter(searchToken) ||
                _isRangeMarker(searchToken) ||
                _isUnknownFilter(searchToken)) {
                return false;
            }
            return true;
        });

        if (knownTokens.length > 0) {
            query = '&cy=D';
        }

        if (! searchTokens.some(function(searchToken) {
                return (searchToken.filter.type === _filterTypes.articleType);
            })) {
            query += '&atype=C';
        }

        if (! searchTokens.some(function(searchToken) {
                return (searchToken.filter.type === _filterTypes.price);
            })) {
            if (isBike(searchTokens)) {
                query += '&pricefrom=500';
            }
            else {
                query += '&pricefrom=1000';
            }
        }

        if (! searchTokens.some(function(searchToken) {
                return (searchToken.filter.type === _filterTypes.usageState);
            })) {
            query += '&ustate=N,U';
        }

        return query;
    };

    var getGeoRadius = function (searchTokens) {
        var geoRadius = searchTokens.filter(function(searchToken) {
            return (searchToken.filter.type === _filterTypes.geoRadius)
        });
        if (geoRadius.length > 0) {
            return geoRadius[0].filter.value;
        }
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

    var createQueryParam = function (searchTokens, filterType, qp, ctx) {
        var separator = ',';
        if (ctx && ctx.separator)
            separator = ctx.separator;

        var query = '' ;
        if (ctx && ctx.defValue)
            query = ctx.defValue;

        _getFiltersByType(searchTokens, filterType)
            .forEach(function (searchToken) {
                if (ctx && ctx.fncGetValue) {
                    query += ctx.fncGetValue(searchToken) + separator;
                }
                else {
                    query += searchToken.filter.value + separator;
                }
            });

        return (query) ? removeLastSeparator('&' + qp+ '=' + query) : query;
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

        return (query) ? removeLastSeparator(query) : query;
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

        return (query) ? removeLastSeparator('&' + qp+ '=' + query) : query;
    };

    var removeLastSeparator = function(str) {
        var t = str.length - 1;
        if (str.charAt(t) == ',') {
            return str.substring(0, t);
        }

        return str;
    };

    return filter;
};