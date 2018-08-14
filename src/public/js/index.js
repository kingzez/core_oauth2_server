// 取路由对应参数的函数封装
var getQueryValue2 = function(key, href) {
    var reg = new RegExp('[?&]' + key + '=([^&]*)', 'g');
    var match = (href || window.location.search).match(reg);
    if (!match) return;
    if (match.length === 1) return decodeURIComponent(match[0].replace(reg, '$1'));
    match = match.map(function(item) {
      return decodeURIComponent(item.replace(reg, '$1'));
    });
    return match;
  };