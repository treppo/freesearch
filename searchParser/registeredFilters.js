module.exports = function (filterPart) {
    'use strict';

    var cleanUpSearchLineFilter = require('./filters/cleanUpSearchLineFilter.js')();
    var createTokensFilter = require('./filters/createTokensFilter.js')();
    var splitMarkerFromTokensFilter = require('./filters/splitMarkerFromTokensFilter.js')();
    var createSearchTermsFilter = require('./filters/createSearchTermsFilter.js')();
    var createMarkerFilter = require('./filters/createMarkerFilter.js')();

    var heuristicFilter = require('./filters/heuristicFilter.js')();
    var makeFilter = require('./filters/makeFilter.js')();
    var modelFilter = require('./filters/modelFilter.js')();
    var priceFilter = require('./filters/priceFilter.js')();
    var powerFilter = require('./filters/powerFilter.js')();
    var mileageFilter = require('./filters/mileageFilter.js')();
    var firstRegistration = require('./filters/firstRegistrationFilter.js')();
    var fuel = require('./filters/fuelFilter.js')();
    var bodyType = require('./filters/bodyTypeFilter.js')();
    var gearing = require('./filters/gearingFilter.js')();
    var equipment = require('./filters/equipmentFilter.js')();
    var customerType = require('./filters/customerTypeFilter.js')();

    var removeMarkerFilter = require('./filters/removeMarkerFilter.js')();
    var rangeMarkerFilter = require('./filters/rangeMarkerFilter.js')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    var all = [
        cleanUpSearchLineFilter,
        createTokensFilter,
        splitMarkerFromTokensFilter,
        createSearchTermsFilter,
        createMarkerFilter,

        heuristicFilter, // power, price etc. terms with entity markers
        makeFilter,
        modelFilter,
        firstRegistration.filter,
        powerFilter.filter,
        priceFilter.filter,
        mileageFilter.filter,
        fuel,
        bodyType,
        gearing,
        equipment,
        customerType,

        rangeMarkerFilter, // work out range markers (from to)
        removeMarkerFilter,
        reduceIdenticalFilter,
        noneFilter
    ];

    var pre = [
        cleanUpSearchLineFilter,
        createTokensFilter,
        splitMarkerFromTokensFilter,
        createSearchTermsFilter,
        createMarkerFilter
    ];

    var post = [
        rangeMarkerFilter,
        removeMarkerFilter,
        reduceIdenticalFilter,
        noneFilter
    ];

    if (filterPart === 'pre') {
        return pre;
    }

    if (filterPart === 'post') {
        return post;
    }

    return all;
};
