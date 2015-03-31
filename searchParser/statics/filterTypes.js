'use strict';

var filterTypes = {};

filterTypes.unknown = 'unknown';
filterTypes.make = 'make';
filterTypes.model = 'model';
filterTypes.modelLine = 'modelLine';
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
filterTypes.articleType = 'articleType';
filterTypes.geoRadius = 'geoRadius';

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

// definition marker
filterTypes.sportCarDefinition = 'sportCarDefinition';
filterTypes.familyCarDefinition = 'familyCarDefinition';

var isDefinitionFilter = function(searchToken) {
    return searchToken.filter.type === filterTypes.sportCarDefinition ||
        searchToken.filter.type === filterTypes.familyCarDefinition
        ;
};

var isMarkerFilter = function (searchToken) {
    return searchToken.filter.type === filterTypes.priceMarker ||
        searchToken.filter.type === filterTypes.powerMarker ||
        searchToken.filter.type === filterTypes.kmMarker ||
        searchToken.filter.type === filterTypes.firstRegistrationMarker ||
        searchToken.filter.type === filterTypes.seatMarker ||
        searchToken.filter.type === filterTypes.doorMarker ||
        searchToken.filter.type === filterTypes.prevOwnerMarker ||
        searchToken.filter.type === filterTypes.onlineSinceMarker
        ;
};

var isRangeMarker = function (searchToken) {
    return searchToken.filter.type === filterTypes.rangeMarker;
};

var isUnknownFilter = function (searchToken) {
    return searchToken.filter.type === filterTypes.unknown;
};

var isPayloadFilter = function (searchToken) {
    return !(
            isMarkerFilter(searchToken) ||
            isRangeMarker(searchToken) ||
            isDefinitionFilter(searchToken)
    );
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
module.exports.isDefinitionFilter = isDefinitionFilter;
module.exports.isPayloadFilter = isPayloadFilter;
