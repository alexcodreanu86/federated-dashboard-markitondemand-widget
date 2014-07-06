(function() {
  var clickOn, inputInto, mockResponse, setupStockFixtures;

  setupStockFixtures = function() {
    return setFixtures("<input name=\"stock-search\" type=\"text\">\n<button data-id=\"stock-button\"></button>\n<div data-id=\"stock-output\"></div>");
  };

  mockResponse = {
    Dates: ["2014-04-30T00:00:00", "2014-05-01T00:00:00", "2014-06-01T00:00:00"],
    Elements: [
      {
        Symbol: "AAPL",
        Type: "price",
        DataSeries: {
          close: {
            values: [84.298, 84.497, 86.654]
          }
        }
      }
    ]
  };

  inputInto = function(name, value) {
    return $("[name=" + name + "]").val(value);
  };

  clickOn = function(element) {
    return $(element).click();
  };

  describe("Stock.Controller", function() {
    it('processInput returns an array of words in a string', function() {
      setupStockFixtures();
      inputInto('stock-search', "some string here");
      return expect(Stock.Controller.processInput()).toEqual(['some', 'string', 'here']);
    });
    it('bind displays stock when the stock-button is clicked', function() {
      setupStockFixtures();
      Stock.Controller.bind();
      inputInto('stock-search', 'AAPL GOOG MSFT');
      spyOn(Stock.API, 'loadChartData').and.returnValue(Stock.Display.showChart(mockResponse));
      clickOn('[data-id=stock-button]');
      return expect($('[data-id=stock-output]')).toContainElement('.highcharts-container');
    });
    it('setupFormIn appends form to the given selector', function() {
      setFixtures(sandbox());
      Stock.Controller.setupWidgetIn('#sandbox');
      return expect($('#sandbox')).toContainElement('[data-id=stock-button]');
    });
    return it('bind calls getChartData wth the current text in the input', function() {
      setupStockFixtures();
      Stock.Controller.bind();
      spyOn(Stock.Controller, 'getStockData');
      inputInto('stock-search', 'AAPL');
      clickOn('[data-id=stock-button]');
      return expect(Stock.Controller.getStockData);
    });
  });

}).call(this);
