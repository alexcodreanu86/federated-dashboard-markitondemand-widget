setupOneContainer = ->
  setFixtures "<div data-id='widget-container-1'></div>"

inputInto = (name, value)->
  $("[name=#{name}]").val(value)

clickOn = (element) ->
  $(element).click()

container = "[data-id=widget-container-1]"

newController = (container) ->
  new Stock.Widgets.Controller(container, "1243")

mockResponse = {
  Dates: [
    "2014-04-30T00:00:00",
    "2014-05-01T00:00:00",
    "2014-06-01T00:00:00"
  ],
  Elements: [
    {
      Symbol: "AAPL",
      Type: "price",
      DataSeries: {
        close: {
          values: [
            84.298,
            84.497,
            86.654
          ]
        }
      }
    }
  ]
}

describe "Stock.Widgets.Controller", ->
  it "stores the container that it is initialized with", ->
    controller = newController(container)
    expect(controller.getContainer()).toEqual(container)

  it "stores a new instance of Stock.Widget.Display when instantiated", ->
    controller = newController(container)
    expect(controller.display).toBeDefined()

  it "initialize sets widget up in its container", ->
    setupOneContainer()
    controller = newController(container)
    controller.initialize()
    expect($(container)).not.toBeEmpty()

  it "initialize is binding the controller", ->
    controller = newController(container)
    spy = spyOn(controller, 'bind')
    controller.initialize()
    expect(spy).toHaveBeenCalled()

  it "bind is displaying the stock when the button is clicked", ->
    setupOneContainer()
    controller = newController(container)
    controller.initialize()
    inputInto('stock-search', 'AAPL GOOG MSFT')
    spyOn(Stock.Widgets.API,'loadChartData').and.returnValue(controller.display.showChart(mockResponse))
    clickOn("#{container} [data-id=stock-button]")
    expect($('[data-id=stock-output]')).toContainElement('.highcharts-container')
    expect(Stock.Widgets.API.loadChartData).toHaveBeenCalled()

  it "hideForm is hiding the form", ->
    setupOneContainer()
    controller = newController(container)
    controller.initialize()
    controller.hideForm()
    expect($("#{container} [data-id=stock-form]").attr('style')).toEqual('display: none;')

  it "showForm is showing the form", ->
    setupOneContainer()
    controller = newController(container)
    controller.initialize()
    controller.hideForm()
    controller.showForm()
    expect($("#{container} [data-id=stock-form]").attr('style')).not.toEqual('display: none;')

  it "removeContent is removing the widget's content", ->
    setupOneContainer()
    controller = newController(container)
    controller.initialize()
    controller.removeContent()
    expect($(container)).not.toContainElement("[data-id=stock-widget-wrapper]")
