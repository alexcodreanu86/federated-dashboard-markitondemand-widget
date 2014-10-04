namespace('Stock')

class Stock.Controller
  @setupWidgetIn: (settings) ->
    new Stock.Widgets.Controller(settings).initialize()
