(function() {
  namespace('Stock');

  Stock.DataFormater = (function() {
    function DataFormater() {}

    DataFormater.formatData = function(stockObj, container) {
      return {
        rangeSelector: {
          selected: 1,
          inputEnabled: $(container).width() > 480
        },
        title: {
          text: "Stock Prices"
        },
        series: this.generateSeriesData(stockObj)
      };
    };

    DataFormater.generateSeriesData = function(response) {
      var element, series, _i, _len, _ref;
      series = [];
      _ref = response.Elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        series.push(this.formatElementObj(element, response.Dates));
      }
      return series;
    };

    DataFormater.formatElementObj = function(element, dates) {
      return {
        name: element.Symbol,
        data: this.formatElementData(dates, element.DataSeries.close.values),
        tooltip: {
          valueDecimals: 2
        }
      };
    };

    DataFormater.formatElementData = function(dates, prices) {
      var data, i, _i, _ref;
      data = [];
      for (i = _i = 0, _ref = dates.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        data.push([new Date(dates[i]).valueOf(), prices[i]]);
      }
      return data;
    };

    return DataFormater;

  })();

}).call(this);
