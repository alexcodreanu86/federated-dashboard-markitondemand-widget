container     = '[data-id=widget-container-1]'
key           = ''
defaultValue  = 'AAPL GOOG MSFT'
requestData   = ['AAPL', 'GOOG', 'MSFT']

setupOneContainer = ->
  setFixtures "<div data-id='widget-container-1'></div>"

inputInto = (name, value)->
  $("[name=#{name}]").val(value)

clickOn = (element) ->
  $(element).click()

container = "[data-id=widget-container-1]"

newController = (container, value) ->
  new Stock.Widgets.Controller({container: container, key: "1243", defaultValue: value})

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
  describe '#initialize', ->
    it "sets widget up in its container", ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      expect($(container)).not.toBeEmpty()

    it "binds the controller", ->
      controller = newController(container)
      spy = spyOn(controller, 'bind')
      controller.initialize()
      expect(spy).toHaveBeenCalled()

    it "tries to display data for the default value", ->
      controller = newController(container)
      spy = spyOn(controller, 'displayDefault')
      controller.initialize()
      expect(spy).toHaveBeenCalled()

    it "sets the widget as active", ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      expect(controller.isActive()).toBe(true)

  describe '#displayDefault', ->
    it "loads data when there is a default value", ->
      controller = newController(container, defaultValue)
      spy = spyOn(Stock.Widgets.API, 'loadChartData')
      controller.displayDefault()
      expect(spy).toHaveBeenCalledWith(requestData, controller.display)

    it "does NOT load data when no default value is provided", ->
      controller = newController(container)
      spy = spyOn(Stock.Widgets.API, 'loadChartData')
      controller.displayDefault()
      expect(spy).not.toHaveBeenCalled()

  describe '#bind', ->
    it "displays the stock when the button is clicked", ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      $('[name=widget-input]').val(defaultValue)
      spy = spyOn(Stock.Widgets.API,'loadChartData')
      clickOn("#{container} [data-name=form-button]")
      expect(spy).toHaveBeenCalledWith(requestData, controller.display)

    it "removes the widget when close-widget button is clicked", ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      $("#{container} [data-name=widget-close]").click()
      expect(container).not.toBeInDOM()

  describe '#unbind', ->
    it 'unbinds the weather button click processing', ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      spy = spyOn $.prototype, 'unbind'
      controller.unbind()
      expect(spy).toHaveBeenCalledWith('submit')


    it "unbinds close widget button processing", ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      controller.unbind()
      $("[data-name=widget-close]").click()
      expect($(container)).toBeInDOM()

  describe '#closeWidget', ->
    it 'unbinds the controller', ->
      setupOneContainer()
      controller = newController(container)
      spy = spyOn(controller, 'unbind')
      controller.closeWidget()
      expect(spy).toHaveBeenCalled()

    it 'sets the widget as inactive', ->
      setupOneContainer()
      controller = newController(container)
      controller.initialize()
      controller.closeWidget()
      expect(controller.isActive()).toBe(false)

  it "removeContent is removing the widget's content", ->
    setupOneContainer()
    controller = newController(container)
    controller.initialize()
    controller.removeContent()
    expect($(container)).not.toContainElement("[data-id=stock-widget-wrapper]")
