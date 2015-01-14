module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _markers = require('../services/markers.js')();
    var _findHelper = require('../statics/findHelper.js')();

    var filter = function (searchTokens) {
        searchTokens = _findHelper.searchTokens(searchTokens, _markers.price, _filterTypes.priceMarker);
        searchTokens = _findHelper.searchTokens(searchTokens, _markers.power, _filterTypes.powerMarker);
        searchTokens = _findHelper.searchTokens(searchTokens, _markers.range, _filterTypes.rangeMarker);
        searchTokens = _findHelper.searchTokens(searchTokens, _markers.km, _filterTypes.kmMarker);
        searchTokens = _findHelper.searchTokens(searchTokens, _markers.firstRegistration, _filterTypes.firstRegistrationMarker);

        return searchTokens;
    };

    return filter;
};