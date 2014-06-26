stockObj = {Name: "Apple Inc", Symbol: "AAPL", Change: 2.46999999999991, ChangePercent: 0.383052634843819, ChangePercentYTD: 15.3773484011265, Open: 646.3, ChangeYTD: 561.02, High: 649.35, LastPrice: 647.29, Low: 642.72, MSDate: 41795.6659722222, MarketCap: 557563307490, Open: 646.3, Timestamp: "Thu Jun 5 15:59:00 UTC-04:00 2014", Volume: 972798 }

assertDisplayHasAnEmptyTable = ->
  expect($('[data-id=stock-output]')).toContainElement('thead')
  expect($('[data-id=stock-output]')).not.toContainElement('td')


inputInto = (name, value)->
  $("[name=#{name}]").val(value)

describe 'Stock.Display', ->

  it "formatResponse returns a formated object", ->
    formatedResponse = Stock.Display.formatResponse(stockObj)
    expect(formatedResponse.change).toEqual('2.47')
    expect(formatedResponse.changePercent).toEqual('0.38')
    expect(formatedResponse.changePercentYTD).toEqual('15.38')
    expect(formatedResponse.open).toEqual(646.3)
    expect(formatedResponse.changeYTD).toEqual('561.02')
    expect(formatedResponse.high).toEqual(649.35)
    expect(formatedResponse.lastPrice).toEqual(647.29)
    expect(formatedResponse.low).toEqual(642.72)
    expect(formatedResponse.msDate).toEqual('41795.67')
    expect(formatedResponse.marketCap).toEqual(557563307490)
    expect(formatedResponse.open).toEqual(646.3)
    expect(formatedResponse.timestamp).toEqual("Thu Jun 5 15:59:00")

  it "getInput returns the text from the input field" , ->
    setFixtures('<input name="stock-search">')
    inputInto('stock-search', 'AAPL')
    expect(Stock.Display.getInput()).toEqual('AAPL')

  it "resetTable adds an empty table to the page", ->
    setFixtures('<div data-id="stock-output"></div>')
    Stock.Display.resetTable()
    assertDisplayHasAnEmptyTable()

  it 'outputData adds a row with the stock Object information to the table body', ->
    setFixtures('<div data-id="stock-output"></div>')
    Stock.Display.resetTable()
    Stock.Display.outputData(stockObj)
    expect($('[data-id=stock-body]')).toContainText('Apple Inc')

  it 'setupFormIn appends form to the given selector', ->
    setFixtures(sandbox())
    Stock.Display.displayFormIn('#sandbox')
    expect($('#sandbox')).toContainElement('[data-id=stock-button]')

  it "generateLogo returns the weather image tag", ->
    imageHtml = Stock.Display.generateLogo({dataId: "weather-logo"})
    expect(imageHtml).toBeMatchedBy('[data-id=weather-logo]')
