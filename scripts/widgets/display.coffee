namespace("Stock.Widget")

class Stock.Widgets.Display
  constructor: (container, animationSpeed) ->
    @container = container
    @animationSpeed = animationSpeed

  setupWidget: ->
    widgetHtml = Stock.Widgets.Templates.renderForm()
    $(@container).append(widgetHtml)

  getInput: ->
    $("#{@container} [name=widget-input]").val()

  showChart: (stockResponse) ->
    formatedResponse = Stock.Widgets.DataFormater.formatData(stockResponse, "[data-name=widget-output]")
    $("#{@container} [data-name=widget-output]").highcharts('StockChart',formatedResponse)

  removeWidget: ->
    $(@container).remove()
