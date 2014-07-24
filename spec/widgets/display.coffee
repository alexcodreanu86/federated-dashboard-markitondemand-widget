setupOneContainer = ->
  setFixtures " <div data-id='widget-container-1'></div>"

setupTwoContainers = ->
  setFixtures """
    <div data-id='widget-container-1'></div>
    <div data-id='widget-container-2'></div>
  """

newDisplay = (container) ->
  new Stock.Widgets.Display(container)

container1 = "[data-id=widget-container-1]"
container2 = "[data-id=widget-container-2]"

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

describe "Stock.Widget.Display", ->
  it "stores the container it is initialized with", ->
    display = newDisplay(container1)
    expect(display.container).toEqual(container1)

  it "setupWidget is setting up the widget in it's container", ->
    display = newDisplay(container1)
    setupOneContainer()
    display.setupWidget()
    expect(container1).toContainElement('.widget .widget-header')

  it "getInput returns the input in the field in it's own container", ->
    setupTwoContainers()
    display1 = newDisplay(container1)
    display2 = newDisplay(container2)
    display1.setupWidget()
    display2.setupWidget()
    $("#{container1} [name=stock-search]").val("text1")
    $("#{container2} [name=stock-search]").val("text2")
    expect(display1.getInput()).toEqual("text1")
    expect(display2.getInput()).toEqual("text2")

  it "showChart adds the chart to the given container", ->
    display = newDisplay(container1)
    setupOneContainer()
    display.setupWidget()
    display.showChart(mockResponse)
    expect($('[data-id=stock-output]')).toContainElement('.highcharts-container')

  it "exitEditMode is hiding the form", ->
    setupOneContainer()
    display = newDisplay(container1)
    display.setupWidget()
    display.exitEditMode()
    expect($("#{container1} [data-id=stock-form]").attr('style')).toEqual('display: none;')

  it "exitEditMode is hiding the form", ->
    setupOneContainer()
    display = newDisplay(container1)
    display.setupWidget()
    display.exitEditMode()
    expect($("#{container1} [data-id=stock-close]").attr('style')).toEqual('display: none;')

  it "enterEditMode is showing the form", ->
    setupOneContainer()
    display = newDisplay(container1)
    display.setupWidget()
    display.exitEditMode()
    display.enterEditMode()
    expect($("#{container1} [data-id=stock-form]").attr('style')).not.toEqual('display: none;')

  it "showForm is showing the form", ->
    setupOneContainer()
    display = newDisplay(container1)
    display.setupWidget()
    display.exitEditMode()
    display.enterEditMode()
    expect($("#{container1} [data-id=stock-close]").attr('style')).not.toEqual('display: none;')

  it "removeWidget is removing the widget's content", ->
    setupOneContainer()
    display = newDisplay(container1)
    display.setupWidget()
    display.removeWidget()
    expect($(container1)).not.toContainElement("[data-id=stock-widget-wrapper]")
