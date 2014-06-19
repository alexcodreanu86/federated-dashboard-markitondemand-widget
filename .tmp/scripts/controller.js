(function() {
  namespace('Stock');

  Stock.Controller = (function() {
    function Controller() {}

    Controller.bind = function() {
      return $('[data-id=stock-button]').click((function(_this) {
        return function() {
          return _this.getStockData(Stock.View.getInput());
        };
      })(this));
    };

    Controller.getStockData = function(searchStr) {
      Stock.View.resetTable();
      return _.each(this.processInput(searchStr), function(symbol) {
        return Stock.API.loadData(symbol, Stock.View.outputData);
      });
    };

    Controller.processInput = function(string) {
      return string.split(/\s+/);
    };

    Controller.setupWidgetIn = function(selector) {
      Stock.View.displayFormIn(selector);
      return this.bind();
    };

    return Controller;

  })();

}).call(this);
