(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
(function() {
    var selectSuggestion = function(searchVal) {
        document.getElementById('search').value = searchVal.label;
        //console.log('searchVal: ' + JSON.stringify(searchVal));
    };

    var notFoundSuggestion = function() {
        //console.log('notFoundAutoCompletion');
    };

    var prepareSearchTokenFilterValue = function (f) {
        var value = '';
        if (f.value) {
            value += ' ' + JSON.stringify(f.value);
        }
        if (f.valueFrom) {
            value += ' ' + JSON.stringify(f.valueFrom);
        }
        if (f.valueTo) {
            value += ' ' + JSON.stringify(f.valueTo);
        }

        return value;
    };

    var printSearchTokens = function(searchTokens) {
        if (! searchTokens)
            return;

        var knownPlaceHolder = document.getElementById("glaskugel");
        var unknownPlaceHolder = document.getElementById("nixverstehen");

        var unknowns = searchTokens.filter(function(r) {
            return (r.filter.type === 'unknown');
        });
        var knowns = searchTokens.filter(function(r) {
            return (r.filter.type !== 'unknown');
        });

        while (knownPlaceHolder.firstChild) {
            knownPlaceHolder.removeChild(knownPlaceHolder.firstChild);
        }
        while (unknownPlaceHolder.firstChild) {
            unknownPlaceHolder.removeChild(unknownPlaceHolder.firstChild);
        }

        var i, li;
        var ulKnown = document.createElement('ul');
        ulKnown.setAttribute('class', 'list-group');
        for (i = 0; i < knowns.length; i++) {
            li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-success');

            li.innerHTML = ' element:' + '<b>' + knowns[i].term + '</b>';
            li.innerHTML += ' type:' + '<b>' + knowns[i].filter.type + '</b>';
            if (knowns[i].filter.term) {
                li.innerHTML += ' term:' + '<b>' + knowns[i].filter.term + '</b>';
            }
            li.innerHTML += ' value:' + prepareSearchTokenFilterValue(knowns[i].filter);
            ulKnown.appendChild(li);
        }

        var ulUnknown = document.createElement('ul');
        ulKnown.setAttribute('class', 'list-group');
        for (i = 0; i < unknowns.length; i++) {
            li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-info');

            li.innerHTML = 'element:' + '<b>' + unknowns[i].term + '</b>';
            ulUnknown.appendChild(li);
        }

        if (knowns.length > 0) {
            knownPlaceHolder.appendChild(document.createTextNode("Glaskugel glaubt:"));
            knownPlaceHolder.appendChild(ulKnown);
        }

        if (unknowns.length > 0) {
            unknownPlaceHolder.appendChild(document.createTextNode("Nicht erkannt:"));
            unknownPlaceHolder.appendChild(ulUnknown);
        }
    };

    var adjustSearchBtn = function(counter, listQuery) {
        var btnSearch = document.getElementById("btnsearch");
        if (counter)
            btnSearch.innerHTML  = counter.toLocaleString() + ' Fahrzeuge';
        else
            btnSearch.innerHTML  = 'Search';

        btnSearch.onclick = function () {
            window.open(listQuery);
        };
    };

    var populateResult = function(r) {
        var res = JSON.parse(r);

        adjustSearchBtn(res.counter, res.listQuery);
        printSearchTokens(res.searchTokens);
    };

    var searchLine = document.getElementById("search");
    require('./suggest')(searchLine, document.getElementById('suggestions'), selectSuggestion, notFoundSuggestion);
    require('./parse')(searchLine, populateResult);
}());
},{"./parse":2,"./suggest":3}],2:[function(require,module,exports){
'use strict';
module.exports = function(source, parseResult) {
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

    var callParser = function(cnt) {
        if (cnt != _cntKeyDown) {
            return;
        }

        var val = encodeURI(source.value);
        ajaxCall(_path + val, parseResult);
    };

    var onKeyDown = function() {
        _cntKeyDown++;
        var f = _cntKeyDown;
        setTimeout(function() { callParser(f) }, 300);
    };

    listenEvent(source, 'keydown', onKeyDown);
};

},{}],3:[function(require,module,exports){
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
        target.style.display = 'block';
    };

    var hideCompletion = function () {
        var child = document.querySelector('[name=autoc]');
        if (child) {
            target.removeChild(child);
        }
        target.style.display = 'none';
    };

    var setActiveItemAttr = function (el) {
        var itemAttr = document.createAttribute('data-acitve');
        itemAttr.value = '1';
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

        ajaxCall('/api/suggest/?s=' + encodeURI(searchVal), function(response) {
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
},{}]},{},[1]);
