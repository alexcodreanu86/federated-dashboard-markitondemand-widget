(function() {
  var assertDisplayHasAnEmptyTable, inputInto, stockObj;

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

  assertDisplayHasAnEmptyTable = function() {
    expect($('[data-id=stock-output]')).toContainElement('thead');
    return expect($('[data-id=stock-output]')).not.toContainElement('td');
  };

  inputInto = function(name, value) {
    return $("[name=" + name + "]").val(value);
  };

  describe('Stock.View', function() {
    it("formatResponse returns a formated object", function() {
      var formatedResponse;
      formatedResponse = Stock.View.formatResponse(stockObj);
      expect(formatedResponse.change).toEqual('2.47');
      expect(formatedResponse.changePercent).toEqual('0.38');
      expect(formatedResponse.changePercentYTD).toEqual('15.38');
      expect(formatedResponse.open).toEqual(646.3);
      expect(formatedResponse.changeYTD).toEqual('561.02');
      expect(formatedResponse.high).toEqual(649.35);
      expect(formatedResponse.lastPrice).toEqual(647.29);
      expect(formatedResponse.low).toEqual(642.72);
      expect(formatedResponse.msDate).toEqual('41795.67');
      expect(formatedResponse.marketCap).toEqual(557563307490);
      expect(formatedResponse.open).toEqual(646.3);
      return expect(formatedResponse.timestamp).toEqual("Thu Jun 5 15:59:00");
    });
    it("getInput returns the text from the input field", function() {
      setFixtures('<input name="stock-search">');
      inputInto('stock-search', 'AAPL');
      return expect(Stock.View.getInput()).toEqual('AAPL');
    });
    it("resetTable adds an empty table to the page", function() {
      setFixtures('<div data-id="stock-output"></div>');
      Stock.View.resetTable();
      return assertDisplayHasAnEmptyTable();
    });
    it('outputData adds a row with the stock Object information to the table body', function() {
      setFixtures('<div data-id="stock-output"></div>');
      Stock.View.resetTable();
      Stock.View.outputData(stockObj);
      return expect($('[data-id=stock-body]')).toContainText('Apple Inc');
    });
    return it('setupFormIn appends form to the given selector', function() {
      setFixtures(sandbox());
      Stock.View.displayFormIn('#sandbox');
      return expect($('#sandbox')).toContainElement('[data-id=stock-button]');
    });
  });

}).call(this);
