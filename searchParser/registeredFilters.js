module.exports = function (context) {
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
    var firstRegistrationFilter = require('./filters/firstRegistrationFilter.js')();
    var fuelFilter = require('./filters/fuelFilter.js')();
    var bodyTypeFilter = require('./filters/bodyTypeFilter.js')();
    var gearingFilter = require('./filters/gearingFilter.js')();
    var equipmentFilter = require('./filters/equipmentFilter.js')();
    var customerTypeFilter = require('./filters/customerTypeFilter.js')();
    var bodyColorFilter = require('./filters/bodyColorFilter.js')();
    var colorEffectFilter = require('./filters/colorEffectFilter.js')();
    var articleOfferTypeFilter = require('./filters/articleOfferTypeFilter.js')();
    var usageStateFilter = require('./filters/usageStateFilter.js')();
    var seatFilter = require('./filters/seatFilter.js')();
    var doorFilter = require('./filters/doorFilter.js')();
    var prevOwnerFilter = require('./filters/previousOwnerFilter.js')();
    var onlineSinceFilter = require('./filters/onlineSinceFilter.js')();
    var pictureAndVideoFilter = require('./filters/pictureAndVideoFilter.js')();

    var removeMarkerFilter = require('./filters/removeMarkerFilter.js')();
    var rangeMarkerFilter = require('./filters/assignRangeFilter.js')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter.js')();
    var normalizeRangeFilter = require('./filters/normalizeRangeFilter.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    var createPublicQueryParamsFilter = require('./filters/createPublicQueryParamsFilter.js')(context);

    var all = [
        cleanUpSearchLineFilter,
        createTokensFilter,
        splitMarkerFromTokensFilter,
        createSearchTermsFilter,
        createMarkerFilter,

        heuristicFilter, // power, price etc. terms with entity markers
        firstRegistrationFilter.filter,
        powerFilter.filter,
        priceFilter.filter,
        mileageFilter.filter,
        fuelFilter,
        bodyTypeFilter,
        gearingFilter,
        equipmentFilter,
        customerTypeFilter,
        bodyColorFilter,
        colorEffectFilter,
        articleOfferTypeFilter,
        usageStateFilter,
        seatFilter.filter,
        doorFilter.filter,
        prevOwnerFilter.filter,
        onlineSinceFilter.filter,
        pictureAndVideoFilter,
        makeFilter,
        modelFilter,

        rangeMarkerFilter, // work out range markers (from to)
        removeMarkerFilter,
        reduceIdenticalFilter,
        normalizeRangeFilter,
        createPublicQueryParamsFilter
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
        normalizeRangeFilter,
        createPublicQueryParamsFilter
    ];

    if (context && context.pre) {
        return pre;
    }

    if (context && context.post) {
        return post;
    }

    return all;
};
