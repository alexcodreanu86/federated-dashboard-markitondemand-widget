(function() {
  namespace('Stock');

  Stock.API = (function() {
    function API() {}

    API.loadChartData = function(symbols, callback) {
      var params;
      params = {
        parameters: JSON.stringify(this.prepareParams(symbols))
      };
      return $.ajax({
        data: params,
        url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
        dataType: "jsonp",
        context: this,
        success: callback
      });
    };

    API.prepareParams = function(symbols) {
      var elements;
      elements = this.generateElements(symbols);
      return {
        Normalized: false,
        NumberOfDays: 60,
        DataPeriod: "Day",
        Elements: elements
      };
    };

    API.generateElements = function(symbols) {
      var elements, symbol, _i, _len;
      elements = [];
      for (_i = 0, _len = symbols.length; _i < _len; _i++) {
        symbol = symbols[_i];
        elements.push({
          Symbol: symbol,
          Type: "price",
          Params: ["c"]
        });
      }
      return elements;
    };

    return API;

  })();

}).call(this);
