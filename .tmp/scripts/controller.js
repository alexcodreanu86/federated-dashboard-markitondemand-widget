(function() {
  namespace('Stock');

  Stock.Controller = (function() {
    function Controller() {}

    Controller.bind = function() {
      return $('[data-id=stock-button]').click((function(_this) {
        return function() {
          return _this.getStockData(Stock.Display.getInput());
        };
      })(this));
    };

    Controller.getStockData = function(searchStr) {
      Stock.Display.resetTable();
      return _.each(this.processInput(searchStr), function(symbol) {
        return Stock.API.loadData(symbol, Stock.Display.outputData);
      });
    };

    Controller.processInput = function(string) {
      return string.split(/\s+/);
    };

    Controller.setupWidgetIn = function(selector) {
      Stock.Display.displayFormIn(selector);
      return this.bind();
    };

    return Controller;

  })();

}).call(this);
