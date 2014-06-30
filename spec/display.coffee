mockResponse = {
  Dates: [
    "2014-04-30T00:00:00",
    "2014-05-01T00:00:00",
    "2014-06-01T00:00:00"
  ],
  Elements: [
    {
      Symbol: "AAPL",
      Type: "price",
      DataSeries: {
        close: {
          values: [
            84.298,
            84.497,
            86.654
          ]
        }
      }
    }
  ]
}


inputInto = (name, value)->
  $("[name=#{name}]").val(value)

describe 'Stock.Display', ->
  it "getInput returns the text from the input field" , ->
    setFixtures('<input name="stock-search">')
    inputInto('stock-search', 'AAPL')
    expect(Stock.Display.getInput()).toEqual('AAPL')

  it 'showFormIn appends form to the given selector', ->
    setFixtures(sandbox())
    Stock.Display.showFormIn('#sandbox')
    expect($('#sandbox')).toContainElement('[data-id=stock-button]')

  it "generateLogo returns the stock image tag", ->
    imageHtml = Stock.Display.generateLogo({dataId: "stock-logo"})
    expect(imageHtml).toBeMatchedBy('[data-id=stock-logo]')

  it "showChart adds the chart to the given container", ->
    setFixtures(sandbox())
    Stock.Display.showFormIn('#sandbox')
    Stock.Display.showChart(mockResponse)
    expect($('[data-id=stock-output]')).toContainElement('.highcharts-container')
