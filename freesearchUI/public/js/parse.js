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
