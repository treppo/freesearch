exports.create = function(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html xmlns="http://www.w3.org/1999/html"><head><meta charset="utf-8"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="/css/style.css"></head><body style="width: 50%; margin-left: auto; margin-right: auto; padding-top: 50px;"><div class="input-group"><input type="text" class="form-control" id="search" placeholder="audi a4 allroad baujahr ab 2004 eingestellt seit vorgestern f\u00fcr 18.000 20.000 \u20ac in Erding" spellcheck="false" autocomplete="off"><span class="input-group-btn"><button id="btnsearch" class="btn btn-default" type="button">Search</button></span></div><div id="glaskugel"></div><div id="nixverstehen"></div><script src="/js/bundle.js"></script></body></html>');
  };
}