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
    return it("generateLogo returns the stock image tag", function() {
      var imageHtml;
      imageHtml = Stock.Display.generateLogo({
        dataId: "stock-logo"
      });
      return expect(imageHtml).toBeMatchedBy('[data-id=stock-logo]');
    });
  });

}).call(this);
