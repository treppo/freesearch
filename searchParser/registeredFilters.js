module.exports = function (context) {
    'use strict';

    var cleanUpSearchLineFilter = require('./filters/cleanUpSearchLineFilter')();
    var createTokensFilter = require('./filters/createTokensFilter')();
    var splitMarkerFromTokensFilter = require('./filters/splitMarkerFromTokensFilter')();
    var createSearchTermsFilter = require('./filters/createSearchTermsFilter')();
    var createMarkerFilter = require('./filters/createMarkerFilter')();

    var heuristicFilter = require('./filters/heuristicFilter')();
    var makeFilter = require('./filters/makeFilter')();
    var modelFilter = require('./filters/modelFilter')();
    var priceFilter = require('./filters/priceFilter')();
    var powerFilter = require('./filters/powerFilter')();
    var mileageFilter = require('./filters/mileageFilter')();
    var firstRegistrationFilter = require('./filters/firstRegistrationFilter')();
    var fuelFilter = require('./filters/fuelFilter')();
    var bodyTypeFilter = require('./filters/bodyTypeFilter')();
    var gearingFilter = require('./filters/gearingFilter')();
    var equipmentFilter = require('./filters/equipmentFilter')();
    var customerTypeFilter = require('./filters/customerTypeFilter')();
    var bodyColorFilter = require('./filters/bodyColorFilter')();
    var colorEffectFilter = require('./filters/colorEffectFilter')();
    var articleOfferTypeFilter = require('./filters/articleOfferTypeFilter')();
    var usageStateFilter = require('./filters/usageStateFilter')();
    var seatFilter = require('./filters/seatFilter')();
    var doorFilter = require('./filters/doorFilter')();
    var prevOwnerFilter = require('./filters/previousOwnerFilter')();
    var onlineSinceFilter = require('./filters/onlineSinceFilter')();
    var pictureAndVideoFilter = require('./filters/pictureAndVideoFilter')();
    var zipFilter = require('./filters/zipFilter')();
    //var cityFilter = require('./filters/cityFilter')();
    var saveSuggestionFilter = require('./filters/saveSuggestionFilter')();

    var removeMarkerFilter = require('./filters/removeMarkerFilter')();
    var assignRangeFilter = require('./filters/assignRangeFilter')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter')();
    var rangeToSingleValueFilter = require('./filters/rangeToSingleValueFilter')();
    //var debugFilter = require('./filters/debugFilter')();
    var noneFilter = require('./filters/noneFilter')();

    var createPublicQueryParamsFilter = require('./filters/createPublicQueryParamsFilter')(context);

    var all = [
        cleanUpSearchLineFilter,
        createTokensFilter,
        splitMarkerFromTokensFilter,
        createSearchTermsFilter,
        createMarkerFilter,

        heuristicFilter, // power, price etc. terms with entity markers
        firstRegistrationFilter.filter,
        powerFilter.filter,
        zipFilter, // greedy, therefore before price
        //cityFilter,
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
//        saveSuggestionFilter,

        assignRangeFilter, // work out range markers (from to)
        removeMarkerFilter,
        reduceIdenticalFilter,
        rangeToSingleValueFilter,
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
        assignRangeFilter,
        removeMarkerFilter,
        reduceIdenticalFilter,
        rangeToSingleValueFilter,
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
