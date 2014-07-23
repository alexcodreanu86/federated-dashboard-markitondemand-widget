namespace('Stock.Widgets')

class Stock.Widgets.API

  @loadChartData: (symbols, displayer) ->
    params = {
      parameters: JSON.stringify(@prepareParams(symbols))
    }

    $.ajax({
      data: params,
      url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
      dataType: "jsonp",
      context: @,
      success: (response) ->
        displayer.showChart(response)
    })

  @prepareParams: (symbols)->
    elements = @generateElements(symbols)
    {
      Normalized: false,
      NumberOfDays: 60,
      DataPeriod: "Day",
      Elements: elements
    }

  @generateElements: (symbols) ->
    elements = []
    elements.push({
      Symbol: symbol,
      Type: "price",
      Params: ["c"]
    }) for symbol in symbols
    elements
