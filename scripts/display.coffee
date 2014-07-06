namespace('Stock')

class Stock.Display
  @getInput: ->
    $('[name=stock-search]').val()

  @showFormIn: (container) ->
    formHtml = Stock.Templates.renderForm()
    $(container).html(formHtml)

  @logoSrc = "https://raw.githubusercontent.com/bwvoss/federated-dashboard-markitondemand-widget/master/lib/icon_29406/stock_icon.png"

  @generateLogo: (config) ->
    logoSrc = @logoSrc
    _.extend(config, {imgSrc: logoSrc})
    Stock.Templates.renderLogo(config)

  @showChart: (stockResponse) ->
    formatedResponse = Stock.DataFormater.formatData(stockResponse, "[data-id=stock-output]")
    $("[data-id=stock-output]").highcharts('StockChart',formatedResponse)

  @hideForm: ->
    $('[data-id=stock-form]').hide()

  @showForm: ->
    $('[data-id=stock-form]').show()
