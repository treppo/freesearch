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