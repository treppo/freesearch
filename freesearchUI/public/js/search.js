'use strict';
(function() {
    var selectSuggestion = function(searchVal, values) {
        console.log('searchVal: ' + searchVal);
    };

    var notFoundSuggestion = function() {
        console.log('notFoundAutoCompletion');
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