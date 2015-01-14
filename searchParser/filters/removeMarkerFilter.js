module.exports = function () {
    'use strict';

    var _filterHelper = require('../statics/filterHelper.js')();

    var filter = function (searchTokens) {
        return searchTokens.filter(function (searchToken) {
            return (
                ! _filterHelper.isRangeMarker(searchToken.filter) &&
                ! _filterHelper.isMarkerFilter(searchToken.filter)
            );
        });
    };

    return filter;
};
