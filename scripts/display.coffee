namespace('Stock')

class Stock.Display
  @logoSrc = "https://raw.githubusercontent.com/bwvoss/federated-dashboard-markitondemand-widget/master/lib/icon_29406/stock_icon.png"

  @generateLogo: (config) ->
    logoSrc = @logoSrc
    _.extend(config, {imgSrc: logoSrc})
    Stock.Templates.renderLogo(config)
