(function() {
  describe('Stock.Widgets.API', function() {
    it("loadChartData calls is reaching the api through ajax", function() {
      spyOn($, 'ajax');
      Stock.Widgets.API.loadChartData("AAPL", null);
      return expect($.ajax).toHaveBeenCalled();
    });
    it("generateElements returns the elements for one Symbol", function() {
      var elements;
      elements = Stock.Widgets.API.generateElements(["AAPL"]);
      expect(elements[0].Symbol).toEqual("AAPL");
      expect(elements[0].Type).toEqual("price");
      return expect(elements[0].Params).toEqual(["c"]);
    });
    it("generateElements returns proper elements for all symbols", function() {
      var elements;
      elements = Stock.Widgets.API.generateElements(["AAPL", "GOOG", "MSFT"]);
      expect(elements[0].Symbol).toEqual("AAPL");
      expect(elements[1].Symbol).toEqual("GOOG");
      return expect(elements[2].Symbol).toEqual("MSFT");
    });
    return it("prepareParams returns proper params for one symbol", function() {
      var params;
      params = Stock.Widgets.API.prepareParams(["AAPL"]);
      expect(params.Normalized).toBe(false);
      expect(params.NumberOfDays).toBe(60);
      expect(params.DataPeriod).toEqual("Day");
      return expect(params.Elements[0].Symbol).toEqual("AAPL");
    });
  });

}).call(this);
