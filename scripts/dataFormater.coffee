namespace('Stock')

class Stock.DataFormater
  @formatData: (stockObj, container) ->
    {
      rangeSelector : {
        selected : 1,
        inputEnabled: $(container).width() > 480
      },
      title: {text: "Stock Prices"},
      series: @generateSeriesData(stockObj)
    }

  @generateSeriesData: (response) ->
    series = []
    series.push(
      @formatElementObj(element, response.Dates)
    ) for element in response.Elements
    series

  @formatElementObj: (element, dates) ->
    {
      name: element.Symbol,
      data: @formatElementData(dates, element.DataSeries.close.values),
      tooltip: {valueDecimals: 2}
    }

  @formatElementData: (dates, prices) ->
    data = []
    data.push(
      [new Date(dates[i]).valueOf(), prices[i]]
    ) for i in [0...dates.length]
    data
