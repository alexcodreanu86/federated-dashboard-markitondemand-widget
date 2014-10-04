namespace("Stock.Widgets")

class Stock.Widgets.Controller
  apiKey = undefined
  constructor: (settings) ->
    apiKey = settings.key
    @container = settings.container
    @display = new Stock.Widgets.Display(@container, settings.animationSpeed)
    @defaultValue = settings.defaultValue
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

  bind: ->
    $("#{@container} [data-name=widget-form]").on 'submit', (e) =>
      e.preventDefault()
      @getStockData()
    $("#{@container} [data-name=widget-close]").on 'click', => @closeWidget()

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
    $("#{@container} [data-name=widget-form]").unbind('submit')
    $("#{@container} [data-name=widget-close]").unbind('click')
