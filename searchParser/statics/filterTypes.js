module.exports = function () {
    'use strict';

    var filterTypes = {};

    filterTypes.unknown = 'unknown';
    filterTypes.make = 'make';
    filterTypes.model = 'model';
    filterTypes.price = 'price';
    filterTypes.power = 'power';

    // entity marker
    filterTypes.priceMarker = 'priceMarker';
    filterTypes.powerMarker = 'powerMarker';
    // range marker
    filterTypes.rangeMarker = 'rangerMarker';

    return filterTypes;
};