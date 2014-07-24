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

  exitEditMode: ->
    @hideForm()
    @hideCloseWidget()

  hideForm: ->
    $("#{@container} [data-id=stock-form]").hide()

  hideCloseWidget: ->
    $("#{@container} [data-id=stock-close]").hide()

  enterEditMode: ->
    @showForm()
    @showCloseWidget()

  showForm: ->
    $("#{@container} [data-id=stock-form]").show()

  showCloseWidget: ->
    $("#{@container} [data-id=stock-close]").show()

  removeWidget: ->
    $(@container).remove()
