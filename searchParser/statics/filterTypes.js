'use strict';

var filterTypes = {};

filterTypes.unknown = 'unknown';
filterTypes.make = 'make';
filterTypes.model = 'model';
filterTypes.price = 'price';
filterTypes.power = 'power';
filterTypes.mileage = 'mileage';
filterTypes.firstRegistration = 'firstRegistration';
filterTypes.fuel = 'fuel';
filterTypes.bodyType = 'bodyType';
filterTypes.gearing = 'gearing';
filterTypes.equipment = 'equipment';
filterTypes.customerType = 'customerType';
filterTypes.bodyColor = 'bodyColor';
filterTypes.articleOfferType = 'articleOfferType';
filterTypes.usageState = 'usageState';
filterTypes.seat = 'seat';
filterTypes.prevOwner = 'prevOwner';
filterTypes.onlineSince = 'onlineSince';
filterTypes.colorEffect = 'colorEffect';
filterTypes.door = 'door';
filterTypes.pictureAndVideo = 'pictureAndVideo';
filterTypes.zip = 'zip';
filterTypes.city = 'city';

// entity marker = isMarkerFilter
filterTypes.priceMarker = 'priceMarker';
filterTypes.powerMarker = 'powerMarker';
filterTypes.kmMarker = 'kmMarker';
filterTypes.firstRegistrationMarker = 'firstRegistrationMarker';
filterTypes.seatMarker = 'seatMarker';
filterTypes.doorMarker = 'doorMarker';
filterTypes.prevOwnerMarker = 'prevOwnerMarker';
filterTypes.onlineSinceMarker = 'onlineSinceMarker';

// range marker
filterTypes.rangeMarker = 'rangerMarker';

var isMarkerFilter = function (filter) {
    return filter.type === filterTypes.priceMarker ||
        filter.type === filterTypes.powerMarker ||
        filter.type === filterTypes.kmMarker ||
        filter.type === filterTypes.firstRegistrationMarker ||
        filter.type === filterTypes.seatMarker ||
        filter.type === filterTypes.doorMarker ||
        filter.type === filterTypes.prevOwnerMarker ||
        filter.type === filterTypes.onlineSinceMarker
        ;
};

var isRangeMarker = function (filter) {
    return filter.type === filterTypes.rangeMarker;
};

var isUnknownFilter = function (filter) {
    return filter.type === filterTypes.unknown;
};

var getFiltersByType = function(searchTokens, filterType) {
    return searchTokens.filter(function(searchToken) {
        return (searchToken.filter.type === filterType);
    });
};

module.exports.filterTypes = filterTypes;
module.exports.isUnknownFilter = isUnknownFilter;
module.exports.isMarkerFilter = isMarkerFilter;
module.exports.isRangeMarker = isRangeMarker;
module.exports.getFiltersByType = getFiltersByType;
