(function() {
  namespace('Stock');

  Stock.API = (function() {
    function API() {}

    API.loadData = function(symbol, callback) {
      return $.ajax({
        method: 'GET',
        url: 'http://dev.markitondemand.com/Api/v2/Quote/jsonp',
        data: {
          symbol: symbol
        },
        dataType: 'jsonp',
        success: callback,
        error: console.log
      });
    };

    return API;

  })();

}).call(this);
