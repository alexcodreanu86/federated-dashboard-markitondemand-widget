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

describe 'Stock.Display', ->
  it "generateLogo returns the stock image tag", ->
    imageHtml = Stock.Display.generateLogo({dataId: "stock-logo"})
    expect(imageHtml).toBeMatchedBy('[data-id=stock-logo]')
