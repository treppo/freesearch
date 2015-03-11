(function() {
    var selectAutoCompletion = function(searchVal, values) {
        console.log('searchVal: ' + searchVal);
    };

    var notFoundAutoCompletion = function() {
//        console.log('notFoundAutoCompletion');
    };

    require('./autocomplete')(document.querySelector('[id=search]'), document.querySelector('label[for=search]'), selectAutoCompletion, notFoundAutoCompletion);
    require('./parser')(document.querySelector('[id=search]'));
}());