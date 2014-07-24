namespace("Stock.Widgets")

class Stock.Widgets.Controller
  apiKey = undefined
  constructor: (container, key, defaultValue) ->
    apiKey = key
    @container = container
    @display = new Stock.Widgets.Display(container)
    @defaultValue = defaultValue
    @activeStatus = false

  initialize: ->
    @display.setupWidget()
    @bind()
    @displayDefault()
    @setAsActive()

  displayDefault: ->
    if @defaultValue
      @loadStockData(@defaultValue)

  setAsActive: ->
    @activeStatus = true

  setAsInactive: ->
    @activeStatus = false

  isActive: ->
    @activeStatus

  getContainer: ->
    @container

  bind: ->
    $("#{@container} [data-id=stock-button]").click(=> @getStockData())
    $("#{@container} [data-id=stock-close]").click(=> @closeWidget())

  getStockData: () ->
    input = @display.getInput()
    @loadStockData(input)

  loadStockData: (input) ->
    symbols = @processInput(input)
    Stock.Widgets.API.loadChartData(symbols, @display)

  processInput: (input) ->
    input.split(/\s+/)

  closeWidget: ->
    @unbind()
    @removeContent()
    @setAsInactive()

  removeContent: ->
    @display.removeWidget()

  unbind: ->
    $("#{@container} [data-id=weather-button]").unbind('click')
    $("#{@container} [data-id=weather-close]").unbind('click')

  hideForm: ->
    @display.exitEditMode()

  showForm: ->
    @display.enterEditMode()
