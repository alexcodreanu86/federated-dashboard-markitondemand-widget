(function() {
  var appendToSandbox, setSandbox, stockObj;

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

  appendToSandbox = function(htmlToAppend) {
    return $('#sandbox').html(htmlToAppend);
  };

  setSandbox = function() {
    return setFixtures(sandbox());
  };

  describe("Stock.Templates", function() {
    return it("renderForm returns the proper html", function() {
      var formHtml;
      formHtml = Stock.Templates.renderForm();
      setSandbox();
      appendToSandbox(formHtml);
      expect($('[name=stock-search]')).toBeInDOM();
      expect($('[data-id=stock-button]')).toBeInDOM();
      return expect($('[data-id=stock-output]')).toBeInDOM();
    });
  });

}).call(this);
