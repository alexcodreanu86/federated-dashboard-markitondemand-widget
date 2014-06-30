(function() {
  var inputInto, mockResponse;

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

  describe('Stock.Display', function() {
    it("getInput returns the text from the input field", function() {
      setFixtures('<input name="stock-search">');
      inputInto('stock-search', 'AAPL');
      return expect(Stock.Display.getInput()).toEqual('AAPL');
    });
    it('showFormIn appends form to the given selector', function() {
      setFixtures(sandbox());
      Stock.Display.showFormIn('#sandbox');
      return expect($('#sandbox')).toContainElement('[data-id=stock-button]');
    });
    it("generateLogo returns the stock image tag", function() {
      var imageHtml;
      imageHtml = Stock.Display.generateLogo({
        dataId: "stock-logo"
      });
      return expect(imageHtml).toBeMatchedBy('[data-id=stock-logo]');
    });
    return it("showChart adds the chart to the given container", function() {
      setFixtures(sandbox());
      Stock.Display.showFormIn('#sandbox');
      Stock.Display.showChart(mockResponse);
      return expect($('[data-id=stock-output]')).toContainElement('.highcharts-container');
    });
  });

}).call(this);
