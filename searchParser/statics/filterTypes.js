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

// entity marker = isMarkerFilter
filterTypes.priceMarker = 'priceMarker';
filterTypes.powerMarker = 'powerMarker';
filterTypes.kmMarker = 'kmMarker';
filterTypes.firstRegistrationMarker = 'firstRegistrationMarker';

// range marker
filterTypes.rangeMarker = 'rangerMarker';

var isMarkerFilter = function (filter) {
    return filter.type === filterTypes.priceMarker ||
        filter.type === filterTypes.powerMarker ||
        filter.type === filterTypes.kmMarker ||
        filter.type === filterTypes.firstRegistrationMarker;
};

var isRangeMarker = function (filter) {
    return filter.type === filterTypes.rangeMarker;
};

var isUnknownFilter = function (filter) {
    return filter.type === filterTypes.unknown;
};

module.exports.filterTypes = filterTypes;
module.exports.isUnknownFilter = isUnknownFilter;
module.exports.isMarkerFilter = isMarkerFilter;
module.exports.isRangeMarker = isRangeMarker;