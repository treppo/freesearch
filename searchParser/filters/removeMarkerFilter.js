module.exports = function () {
    'use strict';

    var _isMarkerFilter = require('../statics/filterTypes.js').isMarkerFilter;
    var _isRangeMarker = require('../statics/filterTypes.js').isRangeMarker;

    var filter = function (searchTokens) {
        return searchTokens.filter(function (searchToken) {
            return (
                ! _isRangeMarker(searchToken.filter) &&
                ! _isMarkerFilter(searchToken.filter)
            );
        });
    };

    return filter;
};
