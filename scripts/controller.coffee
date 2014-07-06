namespace('Stock')

class Stock.Controller
  @bind: ->
    $('[data-id=stock-button]').click(=> @getStockData())

  @getStockData: (searchStr) ->
    symbols = @processInput()
    Stock.API.loadChartData(symbols, Stock.Display.showChart)

  @processInput: ->
    input = Stock.Display.getInput()
    input.split(/\s+/)

  @setupWidgetIn: (selector) ->
    Stock.Display.showFormIn(selector)
    @bind()

