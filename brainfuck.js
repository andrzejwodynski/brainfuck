

var orders = ',.[]<>+-'.split('');
var regex = {
  clean: new RegExp('[^' + escapeRegExp(orders.join('')) + ']','g')
};

module.exports.toJS = function (bfSource) {
  var cleanedSource = (bfSource+'').replace(regex.clean, '').split('');
  var ordersMap = {
    ',': 'm[p]=i();',
    '.': 'o(m[p]);',
    '[': 'while(m[p]){',
    ']': '}',
    '<': '--p;',
    '>': '++p;',
    '+': '++m[p];',
    '-': '--m[p];'
  };

  return cleanedSource.map(function (order) {
    return ordersMap[order];
  }).join('');
};


function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}