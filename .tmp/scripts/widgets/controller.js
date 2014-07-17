(function() {
  namespace("Stock.Widgets");

  Stock.Widgets.Controller = (function() {
    var apiKey;

    apiKey = void 0;

    function Controller(container, key) {
      apiKey = key;
      this.container = container;
      this.display = new Stock.Widgets.Display(container);
    }

    Controller.prototype.initialize = function() {
      this.display.setupWidget();
      return this.bind();
    };

    Controller.prototype.getContainer = function() {
      return this.container;
    };

    Controller.prototype.bind = function() {
      return $("" + this.container + " [data-id=stock-button]").click((function(_this) {
        return function() {
          return _this.getStockData();
        };
      })(this));
    };

    Controller.prototype.getStockData = function(searchStr) {
      var symbols;
      symbols = this.processInput();
      return Stock.Widgets.API.loadChartData(symbols, Stock.Display.showChart);
    };

    Controller.prototype.processInput = function() {
      var input;
      input = this.display.getInput();
      return input.split(/\s+/);
    };

    Controller.prototype.hideForm = function() {
      return this.display.hideForm();
    };

    Controller.prototype.showForm = function() {
      return this.display.showForm();
    };

    Controller.prototype.removeContent = function() {
      return this.display.removeWidget();
    };

    return Controller;

  })();

}).call(this);
