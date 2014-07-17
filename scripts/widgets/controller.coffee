namespace("Stock.Widgets")

class Stock.Widgets.Controller
  apiKey = undefined
  constructor: (container, key) ->
    apiKey = key
    @container = container
    @display = new Stock.Widgets.Display(container)

  initialize: ->
    @display.setupWidget()
    @bind()

  getContainer: ->
    @container

  bind: ->
    $("#{@container} [data-id=stock-button]").click(=> @getStockData())

  getStockData: (searchStr) ->
    symbols = @processInput()
    Stock.Widgets.API.loadChartData(symbols, Stock.Display.showChart)

  processInput: ->
    input = @display.getInput()
    input.split(/\s+/)

  hideForm: ->
    @display.hideForm()

  showForm: ->
    @display.showForm()

  removeContent: ->
    @display.removeWidget()
