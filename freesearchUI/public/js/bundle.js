(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
(function() {
    var selectAutoCompletion = function(searchVal, values) {
        console.log('searchVal: ' + searchVal);
    };

    var notFoundAutoCompletion = function() {
//        console.log('notFoundAutoCompletion');
    };

    var printSearchTokenFilterValue = function (f) {
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

    var parseResult = function(r) {
        var res = JSON.parse(r);

        var unknowns = res.filter(function(r) {
            return (r.filter.type === 'unknown');
        });
        var knowns = res.filter(function(r) {
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
            li.setAttribute('class', 'list-group-item');

            li.innerHTML = ' element:' + '<b>' + knowns[i].term + '</b>';
            li.innerHTML += ' type:' + '<b>' + knowns[i].filter.type + '</b>';
            if (knowns[i].filter.term) {
                li.innerHTML += ' term:' + '<b>' + knowns[i].filter.term + '</b>';
            }
            li.innerHTML += ' value:' + printSearchTokenFilterValue(knowns[i].filter);
            ulKnown.appendChild(li);
        }

        var ulUnknown = document.createElement('ul');
        ulKnown.setAttribute('class', 'list-group');
        for (i = 0; i < unknowns.length; i++) {
            li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');

            li.innerHTML = 'element:' + '<b>' + unknowns[i].term + '</b>';
            ulUnknown.appendChild(li);
        }

        knownPlaceHolder.appendChild(ulKnown);
        unknownPlaceHolder.appendChild(ulUnknown);
    };

    var knownPlaceHolder = document.getElementById("glaskugel");
    var unknownPlaceHolder = document.getElementById("nixverstehen");

    var searchLine = document.getElementById("search");
    //require('./autocomplete')(searchLine, document.querySelector('label[for=search]'), selectAutoCompletion, notFoundAutoCompletion);
    require('./parse')(searchLine, parseResult);

}());
},{"./parse":2}],2:[function(require,module,exports){
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
        if (!val) {
            return;
        }

        ajaxCall(_path + val, parseResult);
    };

    var onKeyDown = function() {
        _cntKeyDown++;
        var f = _cntKeyDown;
        setTimeout(function() { callParser(f) }, 300);
    };

    listenEvent(source, 'keydown', onKeyDown);
};

},{}]},{},[1]);
