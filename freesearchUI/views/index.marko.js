exports.create = function(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html xmlns="http://www.w3.org/1999/html"><head><meta charset="utf-8"></head><label for="search"><input type="text" id="search" autocomplete="off" placeholder="audi a4 allroad baujahr ab 2004 eingestellt seit vorgestern f\u00fcr 18000 20000 \u20ac" spellcheck="false" style="position: relative; vertical-align: top;"><input type="button" id="searchbtn"></label><script src="/js/bundle.js"></script><script>\n\n</script><body></body></html>');
  };
}