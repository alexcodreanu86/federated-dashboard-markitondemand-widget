namespace('Stock')

class Stock.Display
  @generateLogo: (config) ->
    "<i class=\"fa fa-bar-chart-o #{config.class}\" data-id=\"#{config.dataId}\"></i>"
