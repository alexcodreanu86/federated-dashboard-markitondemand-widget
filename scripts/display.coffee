namespace('Stock')

class Stock.Display
  @generateLogo: (config) ->
    "<i class=\"fa fa-chart-o #{config.class}\" data-id=\"#{config.dataId}\"></i>"
