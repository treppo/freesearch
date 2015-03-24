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
    var modelLineFilter = require('./filters/modelLineFilter')();

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
    var pictureAndVideoFilter = require('./filters/pictureAndVideoFilter')();
    var zipFilter = require('./filters/zipFilter')();
    var cityFilter = require('./filters/cityFilter')();
    var assignRangeFilter = require('./filters/assignRangeFilter')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter')();
    var rangeToSingleValueFilter = require('./filters/rangeToSingleValueFilter')();
    var geoRadiusFilter = require('./filters/geoRadiusFilter')();
    //var debugFilter = require('./filters/debugFilter')();
    //var noneFilter = require('./filters/noneFilter')();
    var createPublicQueryParamsFilter = require('./filters/createPublicQueryParamsFilter')(context);
    //var saveSuggestionFilter = require('./filters/saveSuggestionFilter')();

    var pathToFile;
    if (context && context.saveSearchLineToFile)
        pathToFile = context.saveSearchLineToFile;
    var saveSearchLineFilter = require('./filters/saveSearchLineFilter')(pathToFile);

    var main = [
        firstRegistrationFilter,
        zipFilter,
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
        modelLineFilter,
        modelFilter
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

    var infrastructure = [
        //saveSuggestionFilter
        saveSearchLineFilter
    ];

    if (context && context.pre) {
        return pre;
    }

    if (context && context.post) {
        return post;
    }

    if (context && context.infra) {
        return  pre.concat(main).concat(post).concat(infrastructure);
    }

    return pre.concat(main).concat(post);
};
