namespace("Stock.Widget")

class Stock.Widgets.Display
  constructor: (container) ->
    @container = container

  setupWidget: ->
    widgetHtml = Stock.Widgets.Templates.renderForm()
    $(@container).append(widgetHtml)

  getInput: ->
    $("#{@container} [name=stock-search]").val()

  showChart: (stockResponse) ->
    formatedResponse = Stock.Widgets.DataFormater.formatData(stockResponse, "[data-id=stock-output]")
    $("#{@container} [data-id=stock-output]").highcharts('StockChart',formatedResponse)

  hideForm: ->
    $("#{@container} [data-id=stock-form]").hide()

  showForm: ->
    $("#{@container} [data-id=stock-form]").show()

  removeWidget: ->
    $(@container).remove()
