(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./autocomplete":2,"./parser":3}],2:[function(require,module,exports){
'use strict';
module.exports = function(source, target, selectedEntryCallBack, notFoundEntryCallBack) {
    var _isSelected = false;

    var listenEvent = function(obj, event, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(event, callback);
        } else {
            obj.attachEvent('on' + event, callback);
        }
    };

    var ajaxCall = function(url, callback) {
        var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    callback(request.responseText);
                }
            }
        };

        request.open('GET', url, true);
        request.send();
    };

    var clickCompletionEntry = function (val) {
        return function(e) {
            runSelectedEntryCallBack(val);
        };
    };

    var showCompletion = function(complContainer) {
        target.appendChild(complContainer);
    };

    var hideCompletion = function () {
        var child = document.querySelector('[name=autoc]');
        if (child) {
            target.removeChild(child);
        }
    };

    var setActiveItemAttr = function (el) {
        var itemAttr = document.createAttribute('data-acitve');
        itemAttr.value = 1;
        el.setAttributeNode(itemAttr);
    };

    var getActiveItem = function() {
        return document.querySelector('[data-acitve="1"]');
    };

    var setActiveItem = function (el) {
        var activeItem = getActiveItem();

        if (activeItem) {
            activeItem.dataset.acitve = 0;
        }

        setActiveItemAttr(el);
    };

    var createCompletionItems = function(searchVal, values) {
        var complContainer = document.createElement('ul');
        var attr = document.createAttribute('name');
        attr.value = 'autoc';
        complContainer.setAttributeNode(attr);

        values.forEach(function(value, index) {
            var item = document.createElement('li');
            item.onclick = clickCompletionEntry(value);
            item.onmouseover = function () { setActiveItem(this); };
            var text = searchVal + '<b>' + value.label.substring(searchVal.length) + '</b>';
            var el = document.createElement('span');
            el.innerHTML = capitaliseFirstLetter(text);

            if (index === 0) {
                setActiveItemAttr(item);
            }

            item.appendChild(el);
            complContainer.appendChild(item);
        });

        return complContainer;
    };

    var runSelectedEntryCallBack = function(val) {
        _isSelected = true;
        /*
         label: "Erdmannhausen"
         lat: 48.933
         lon: 9.3
         */
        selectedEntryCallBack(val);
    };

    var populateAutocomplete = function(searchVal, values) {
        if (values.length) {
            var c = createCompletionItems(searchVal, values);
            hideCompletion();
            showCompletion(c);
        } else {
            notFoundEntryCallBack();
            hideCompletion();
        }
    };

    var takeFirstIfOnlyOne = function(searchVal, values) {
        if (values.length == 1) {
            hideCompletion();
            runSelectedEntryCallBack(values[0]);
        } else {
            notFoundEntryCallBack();
        }
    };

    var getAutocomplete = function(searchVal, callBack) {
        _isSelected = false;

        ajaxCall('/api/autocomplete/?s=' + encodeURI(searchVal), function(response) {
            var values = JSON.parse(response);
            callBack(searchVal, values);
        });
    };

    var capitaliseFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    var onSourceKeyUp = function(e) {
        var keyCode = e.keyCode || e.which;
        var searchVal = e.target.value;
        var activeItem;

        if (keyCode == 13 || keyCode == 39) { // right
            activeItem = getActiveItem();
            if (activeItem) {
                activeItem.onclick();
                hideCompletion();
            }

            return;
        }

        if (keyCode == 27) { // esc
            hideCompletion();
            return;
        }

        if (keyCode == 38 || keyCode == 40) { // up / down
            activeItem = getActiveItem();
            if (activeItem) {
                var el = (keyCode == 38) ? activeItem.previousElementSibling : activeItem.nextElementSibling;
                if (el) {
                    setActiveItem(el);
                }
            }

            return;
        }

        getAutocomplete(searchVal, populateAutocomplete);
    };

    var onSourceKeyDown = function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9) { // tab
            var activeItem = getActiveItem();
            if (activeItem) {
                activeItem.onclick();
                hideCompletion();
            }
            return;
        }

        if (keyCode == 13) { // enter
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }

            activeItem = getActiveItem();
            if (activeItem) {
                activeItem.onclick();
                hideCompletion();
            }

            return;
        }
    };

    var onSourceBlur = function (e) {
        if (!_isSelected) {
            var searchVal = e.target.value;
            getAutocomplete(searchVal, takeFirstIfOnlyOne);
        }
    };

    var init = function() {
        listenEvent(source, 'keydown', onSourceKeyDown);
        listenEvent(source, 'keyup', onSourceKeyUp);
        listenEvent(source, 'blur', onSourceBlur);
        listenEvent(document, 'click', hideCompletion);
    };

    init();
};
},{}],3:[function(require,module,exports){
'use strict';
module.exports = function(source) {
    var _path = '/api/parse/?s=';
    var _cntKeyDown = 0;


    var listenEvent = function(obj, event, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(event, callback);
        } else {
            obj.attachEvent('on' + event, callback);
        }
    };

    var ajaxCall = function(url, callback) {
        var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    callback(request.responseText);
                }
            }
        };

        request.open('GET', url, true);
        request.send();
    };

    var parseResult = function(res) {
        console.log('res ' + res);
    };

    var callParser = function(cnt) {
        if (cnt != _cntKeyDown) {
            return;
        }

        var val = encodeURI(source.value);
        if (!val) {
            return;
        }

        ajaxCall(_path + val, parseResult);
    };

    var onKeyDown = function() {
        _cntKeyDown++;
        var f = _cntKeyDown;
        setTimeout(function() { callParser(f) }, 2000);
    };

    listenEvent(source, 'keydown', onKeyDown);
};

},{}]},{},[1]);
