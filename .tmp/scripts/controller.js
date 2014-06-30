(function() {
  namespace('Stock');

  Stock.Controller = (function() {
    function Controller() {}

    Controller.bind = function() {
      return $('[data-id=stock-button]').click((function(_this) {
        return function() {
          return _this.getStockData();
        };
      })(this));
    };

    Controller.getStockData = function(searchStr) {
      var symbols;
      symbols = this.processInput();
      return Stock.API.loadChartData(symbols, Stock.Display.showChart);
    };

    Controller.processInput = function() {
      var input;
      input = Stock.Display.getInput();
      return input.split(/\s+/);
    };

    Controller.setupWidgetIn = function(selector) {
      Stock.Display.showFormIn(selector);
      return this.bind();
    };

    return Controller;

  })();

}).call(this);
