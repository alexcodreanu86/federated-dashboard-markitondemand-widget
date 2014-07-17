setupStockFixtures = ->
  setFixtures """
                <input name="stock-search" type="text">
                <button data-id="stock-button"></button>
                <div data-id="stock-output"></div>
              """

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

inputInto = (name, value)->
  $("[name=#{name}]").val(value)

clickOn = (element) ->
  $(element).click()


clickOn = (element) ->
  $(element).click()

resetWidgetsContainer = ->
  Stock.Controller.widgets = []

setSandbox = ->
  setFixtures(sandbox())

setupTwoContainers = ->
  setFixtures """
    <div data-id='widget-container-1'></div>
    <div data-id='widget-container-2'></div>
  """

container1 = "[data-id=widget-container-1]"
container2 = "[data-id=widget-container-2]"

describe "Stock.Controller", ->
  it "widgets container is empty on initialization", ->
    resetWidgetsContainer()
    container = Stock.Controller.getWidgets()
    expect(container.length).toBe(0)

  it "setupWidgetIn is setting up a widget instance in the desired element", ->
    resetWidgetsContainer()
    setSandbox()
    Stock.Controller.setupWidgetIn('#sandbox', "123456")
    html = $('#sandbox')
    expect(html).toContainElement('[name=stock-search]')
    expect(html).toContainElement('[data-id=stock-button]')
    expect(html).toContainElement('[data-id=stock-output]')

  it "setupWidgetIn is adding the initialized widget to the widgets container", ->
    resetWidgetsContainer()
    setSandbox()
    Stock.Controller.setupWidgetIn('#sandbox', "123456")
    expect(Stock.Controller.getWidgets().length).toEqual(1)

  it "hideForms is hiding the forms of all the widgets that are initialized", ->
    resetWidgetsContainer()
    setupTwoContainers()
    Stock.Controller.setupWidgetIn(container1, "123456")
    Stock.Controller.setupWidgetIn(container2, "123456")
    Stock.Controller.hideForms()
    expect($("#{container1} [data-id=stock-form]").attr('style')).toEqual('display: none;')
    expect($("#{container2} [data-id=stock-form]").attr('style')).toEqual('display: none;')

  it "showForms is showing the forms of all the widgets that are initialized", ->
    resetWidgetsContainer()
    setupTwoContainers()
    Stock.Controller.setupWidgetIn(container1, "123456")
    Stock.Controller.setupWidgetIn(container2, "123456")
    Stock.Controller.hideForms()
    Stock.Controller.showForms()
    expect($("#{container1} [data-id=stock-form]").attr('style')).not.toEqual('display: none;')
    expect($("#{container2} [data-id=stock-form]").attr('style')).not.toEqual('display: none;')

  it "closeWidgetInContainer will eliminate the widget from the given container", ->
    resetWidgetsContainer()
    setupTwoContainers()
    Stock.Controller.setupWidgetIn(container1, "123456")
    Stock.Controller.setupWidgetIn(container2, "123456")
    Stock.Controller.closeWidgetInContainer(container1)
    expect($("#{container1} [data-id=stock-form]")).not.toBeInDOM()
    expect($("#{container2} [data-id=stock-form]")).toBeInDOM()

  it "closeWidgetInContainer will remove the widget from the widgets container", ->
    resetWidgetsContainer()
    setupTwoContainers()
    Stock.Controller.setupWidgetIn(container1, "123456")
    Stock.Controller.setupWidgetIn(container2, "123456")
    Stock.Controller.closeWidgetInContainer(container1)
    expect(Stock.Controller.getWidgets().length).toEqual(1)
