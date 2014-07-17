(function() {
  var AAPLData, GOOGData, assertAAPLDataIsFormatedProperly, assertGOOGDataIsFormatedProperly, oneSymbolResponse, twoSymbolResponse;

  oneSymbolResponse = {
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

  twoSymbolResponse = {
    Dates: oneSymbolResponse.Dates,
    Elements: [
      oneSymbolResponse.Elements[0], {
        Symbol: "GOOGL",
        Type: "price",
        DataSeries: {
          close: {
            values: [534.88, 538.53, 533.87]
          }
        }
      }
    ]
  };

  AAPLData = [[1398816000000, 84.298], [1398902400000, 84.497], [1401580800000, 86.654]];

  GOOGData = [[1398816000000, 534.88], [1398902400000, 538.53], [1401580800000, 533.87]];

  assertAAPLDataIsFormatedProperly = function(data) {
    expect(data.title.text).toEqual("Stock Prices");
    expect(data.series[0].name).toEqual("AAPL");
    expect(data.series[0].data).toEqual(AAPLData);
    return expect(data.series[0].tooltip).toEqual({
      valueDecimals: 2
    });
  };

  assertGOOGDataIsFormatedProperly = function(data) {
    expect(data.series[1].name).toEqual("GOOGL");
    expect(data.series[1].data).toEqual(GOOGData);
    return expect(data.series[1].tooltip).toEqual({
      valueDecimals: 2
    });
  };

  describe("Stock.Widgets.DataFormater", function() {
    it("formatData returns properly formated data for one symbol", function() {
      var data;
      data = Stock.Widgets.DataFormater.formatData(oneSymbolResponse, "#sandbox");
      return assertAAPLDataIsFormatedProperly(data);
    });
    return it("formatData returns properly formated data for two symbols", function() {
      var data;
      data = Stock.Widgets.DataFormater.formatData(twoSymbolResponse, "#sandbox");
      assertAAPLDataIsFormatedProperly(data);
      return assertGOOGDataIsFormatedProperly(data);
    });
  });

}).call(this);
