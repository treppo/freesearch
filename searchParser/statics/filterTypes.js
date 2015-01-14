module.exports = function () {
    'use strict';

    var filterTypes = {};

    filterTypes.unknown = 'unknown';
    filterTypes.make = 'make';
    filterTypes.model = 'model';
    filterTypes.price = 'price';
    filterTypes.power = 'power';
    filterTypes.mileage = 'mileage';
    filterTypes.firstRegistration  = 'firstRegistration';

    // entity marker = isMarkerFilter
    filterTypes.priceMarker = 'priceMarker';
    filterTypes.powerMarker = 'powerMarker';
    filterTypes.kmMarker = 'kmMarker';
    filterTypes.firstRegistrationMarker = 'firstRegistrationMarker';

    // range marker
    filterTypes.rangeMarker = 'rangerMarker';

    return filterTypes;
};