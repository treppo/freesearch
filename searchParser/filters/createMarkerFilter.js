module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _markers = require('../services/markerService')();
    var _findHelper = require('../statics/findHelper')();

    var filter = function (searchTokens) {
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.price, _filterTypes.priceMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.power, _filterTypes.powerMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.range, _filterTypes.rangeMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.km, _filterTypes.kmMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.firstRegistration, _filterTypes.firstRegistrationMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.seat, _filterTypes.seatMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.door, _filterTypes.doorMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.prevOwner, _filterTypes.prevOwnerMarker);
        searchTokens = _findHelper.matchTokens(searchTokens, _markers.onlineSince, _filterTypes.onlineSinceMarker);

        return searchTokens;
    };

    return filter;
};