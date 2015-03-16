'use strict';
module.exports = function (context) {

    var cleanUpSearchLineFilter = require('./filters/cleanUpSearchLineFilter')();
    var createTokensFilter = require('./filters/createTokensFilter')();
    var createSynonymFilter = require('./filters/createSynonymFilter')();
    var createSearchTokensFilter = require('./filters/createSearchTokensFilter')();
    var createMarkerFilter = require('./filters/createMarkerFilter')();

    var heuristicFilter = require('./filters/heuristicFilter')();
    var makeFilter = require('./filters/makeFilter')();
    var modelFilter = require('./filters/modelFilter')();
    var priceFilter = require('./filters/priceFilter')();
    var powerFilter = require('./filters/powerFilter')();
    var firstRegistrationFilter = require('./filters/firstRegistrationFilter')();
    var fuelFilter = require('./filters/fuelFilter')();
    var bodyTypeFilter = require('./filters/bodyTypeFilter')();
    var gearingFilter = require('./filters/gearingFilter')();
    var equipmentFilter = require('./filters/equipmentFilter')();
    var customerTypeFilter = require('./filters/customerTypeFilter')();
    var articleTypeFilter = require('./filters/articleTypeFilter')();
    var bodyColorFilter = require('./filters/bodyColorFilter')();
    var colorEffectFilter = require('./filters/colorEffectFilter')();
    var articleOfferTypeFilter = require('./filters/articleOfferTypeFilter')();
    var usageStateFilter = require('./filters/usageStateFilter')();
    var doorFilter = require('./filters/doorFilter')();
    var onlineSinceFilter = require('./filters/onlineSinceFilter')();
    var pictureAndVideoFilter = require('./filters/pictureAndVideoFilter')();
    var zipFilter = require('./filters/zipFilter')();
    var cityFilter = require('./filters/cityFilter')();
    var saveSuggestionFilter = require('./filters/saveSuggestionFilter')();
    var assignRangeFilter = require('./filters/assignRangeFilter')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter')();
    var rangeToSingleValueFilter = require('./filters/rangeToSingleValueFilter')();
    var geoRadiusFilter = require('./filters/geoRadiusFilter')();
    //var debugFilter = require('./filters/debugFilter')();
    //var noneFilter = require('./filters/noneFilter')();
    var createPublicQueryParamsFilter = require('./filters/createPublicQueryParamsFilter')(context);

    var main = [
        zipFilter, // greedy, therefore before price
        heuristicFilter, // power, price etc. terms with entity markers
        fuelFilter,
        bodyTypeFilter,
        gearingFilter,
        equipmentFilter,
        customerTypeFilter,
        articleTypeFilter,
        bodyColorFilter,
        colorEffectFilter,
        articleOfferTypeFilter,
        usageStateFilter,
        pictureAndVideoFilter,
        makeFilter,
        cityFilter,
        geoRadiusFilter, // depends on city and zip filters, therefore must be after both. But before model due its greedy (e.g 100).
        modelFilter
    ];

    var infrastructure = [
        //saveSuggestionFilter
    ];

    var pre = [
        cleanUpSearchLineFilter,
        createTokensFilter,
        createSearchTokensFilter,
        createSynonymFilter,
        createMarkerFilter
    ];

    var post = [
        assignRangeFilter, // work out range markers (from to)
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

    if (context && context.infra) {
        return  pre.concat(main).concat(infrastructure).concat(post);
    }

    return pre.concat(main).concat(post);
};
