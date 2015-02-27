var _filterHelper = require('../statics/filterHelper')();

describe('Test iterate function', function() {
    var fncApply = function (item, idx) {
        return {
            elem : item.elem + idx + 1,
            index: item.index
        };
    };

    var fncFilter = function (item) {
        return (item.elem > 1 && item.elem < 5);
    };

    describe('when iterate through an array with an apply function', function () {
        var arr = [
            {elem: 1, index: 1},
            {elem: 2, index: 2},
            {elem: 3, index: 3},
            {elem: 4, index: 4},
            {elem: 5, index: 5}
        ];

        var expected = [
            {elem: 1, index: 1},
            {elem: 3, index: 2},
            {elem: 5, index: 3},
            {elem: 7, index: 4},
            {elem: 5, index: 5}
        ];

        it('it should return changed array', function () {
            var res = _filterHelper.iterateForward(arr, fncFilter, fncApply);
            expect(res).toEqual(expected);
        });
    });

    describe('when iterate reverse through an array with an apply function', function () {
        var arr = [
            {elem: 1, index: 1},
            {elem: 2, index: 2},
            {elem: 3, index: 3},
            {elem: 4, index: 4},
            {elem: 5, index: 5}
        ];

        var expected = [
            {elem: 1, index: 1},
            {elem: 5, index: 2},
            {elem: 5, index: 3},
            {elem: 5, index: 4},
            {elem: 5, index: 5}
        ];

        it('it should return changed array', function () {
            var res = _filterHelper.iterateBackward(arr, fncFilter, fncApply);
            expect(res).toEqual(expected);
        });
    });
});