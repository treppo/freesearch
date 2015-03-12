exports.create = function(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html xmlns="http://www.w3.org/1999/html"><head><meta charset="utf-8"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></head><body><div style="width: 50%; margin-left: auto; margin-right: auto; padding-top: 50px"><form><div class="form-group"><input type="text" class="form-control" id="search" placeholder="audi a4 allroad baujahr ab 2004 eingestellt seit vorgestern f\u00fcr 18000 20000 \u20ac" spellcheck="false" autocomplete="off"><button type="submit" class="btn btn-default" style="float: right">Search</button></div><br><div id="glaskugel"></div><div id="nixverstehen"></div></form></div><script src="/js/bundle.js"></script></body></html>');
  };
}