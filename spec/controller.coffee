setupStockFixtures = ->
  setFixtures """
                <input name="stock-search" type="text">
                <button data-id="stock-button"></button>
                <div data-id="stock-output"></div>
              """

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

clickOn = (element) ->
  $(element).click()

describe "Stock.Controller", ->

  it 'processInput returns an array of words in a string', ->
    setupStockFixtures()
    inputInto('stock-search', "some string here")
    expect(Stock.Controller.processInput()).toEqual(['some', 'string', 'here'])

  it 'bind displays stock when the stock-button is clicked', ->
    setupStockFixtures()
    Stock.Controller.bind()
    inputInto('stock-search', 'AAPL GOOG MSFT')
    spyOn(Stock.API,'loadChartData').and.returnValue(Stock.Display.showChart(mockResponse))
    clickOn('[data-id=stock-button]')
    expect($('[data-id=stock-output]')).toContainElement('.highcharts-container')


  it 'setupFormIn appends form to the given selector', ->
    setFixtures(sandbox())
    Stock.Controller.setupWidgetIn('#sandbox')
    expect($('#sandbox')).toContainElement('[data-id=stock-button]')

  it 'bind calls getChartData wth the current text in the input', ->
    setupStockFixtures()
    Stock.Controller.bind()
    spyOn(Stock.Controller, 'getStockData')
    inputInto('stock-search', 'AAPL')
    clickOn('[data-id=stock-button]')
    expect(Stock.Controller.getStockData)

