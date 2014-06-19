(function() {
  var clickOn, inputInto, setupStockFixtures, stockObj;

  setupStockFixtures = function() {
    return setFixtures("<input name=\"stock-search\" type=\"text\">\n<button data-id=\"stock-button\"></button>\n<div data-id=\"stock-output\"></div>");
  };

  stockObj = {
    Name: "Apple Inc",
    Symbol: "AAPL",
    Change: 2.46999999999991,
    ChangePercent: 0.383052634843819,
    ChangePercentYTD: 15.3773484011265,
    Open: 646.3,
    ChangeYTD: 561.02,
    High: 649.35,
    LastPrice: 647.29,
    Low: 642.72,
    MSDate: 41795.6659722222,
    MarketCap: 557563307490,
    Open: 646.3,
    Timestamp: "Thu Jun 5 15:59:00 UTC-04:00 2014",
    Volume: 972798
  };

  inputInto = function(name, value) {
    return $("[name=" + name + "]").val(value);
  };

  clickOn = function(element) {
    return $(element).click();
  };

  describe("Stock.Controller", function() {
    it('bind calls getStockData wth the current text in the input', function() {
      setupStockFixtures();
      Stock.Controller.bind();
      spyOn(Stock.Controller, 'getStockData');
      inputInto('stock-search', 'AAPL');
      clickOn('[data-id=stock-button]');
      return expect(Stock.Controller.getStockData).toHaveBeenCalledWith('AAPL');
    });
    it("getStockData calls the stockApi 3 times for a string that contains 3 symbols", function() {
      var spy;
      spy = spyOn(Stock.API, 'loadData');
      Stock.Controller.getStockData('AAPL GOOG MSFT');
      return expect(spy.calls.count()).toEqual(3);
    });
    it("getStockData resets the stock table", function() {
      var tableSpy;
      tableSpy = spyOn(Stock.View, 'resetTable');
      spyOn(Stock.API, 'loadData');
      Stock.Controller.getStockData('AAPL');
      return expect(tableSpy).toHaveBeenCalled();
    });
    it("processInput returns an array of words in a string", function() {
      return expect(Stock.Controller.processInput('some string here')).toEqual(['some', 'string', 'here']);
    });
    it('bind displays stock data for each symbol in the search-field', function() {
      setupStockFixtures();
      Stock.Controller.bind();
      inputInto('stock-search', 'AAPL GOOG MSFT');
      spyOn(Stock.API, 'loadData').and.returnValue(Stock.View.outputData(stockObj));
      clickOn('[data-id=stock-button]');
      return expect(Stock.API.loadData.calls.count()).toEqual(3);
    });
    return it('setupFormIn appends form to the given selector', function() {
      setFixtures(sandbox());
      Stock.Controller.setupWidgetIn('#sandbox');
      return expect($('#sandbox')).toContainElement('[data-id=stock-button]');
    });
  });

}).call(this);
