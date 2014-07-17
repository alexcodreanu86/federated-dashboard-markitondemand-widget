describe 'Stock.Widgets.API', ->
  it "loadChartData calls is reaching the api through ajax", ->
    spyOn($, 'ajax')
    Stock.Widgets.API.loadChartData("AAPL", null)
    expect($.ajax).toHaveBeenCalled()

  it "generateElements returns the elements for one Symbol", ->
    elements = Stock.Widgets.API.generateElements(["AAPL"])
    expect(elements[0].Symbol).toEqual("AAPL")
    expect(elements[0].Type).toEqual("price")
    expect(elements[0].Params).toEqual(["c"])

  it "generateElements returns proper elements for all symbols", ->
    elements = Stock.Widgets.API.generateElements(["AAPL", "GOOG", "MSFT"])
    expect(elements[0].Symbol).toEqual("AAPL")
    expect(elements[1].Symbol).toEqual("GOOG")
    expect(elements[2].Symbol).toEqual("MSFT")

  it "prepareParams returns proper params for one symbol", ->
    params =  Stock.Widgets.API.prepareParams(["AAPL"])
    expect(params.Normalized).toBe(false)
    expect(params.NumberOfDays).toBe(60)
    expect(params.DataPeriod).toEqual("Day")
    expect(params.Elements[0].Symbol).toEqual("AAPL")
