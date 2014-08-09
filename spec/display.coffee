describe 'Stock.Display', ->
  it "generateLogo returns the stock image tag", ->
    imageHtml = Stock.Display.generateLogo({dataId: "stock-logo", class: 'some-class'})
    expect(imageHtml).toBeMatchedBy('[data-id=stock-logo]')
    expect(imageHtml).toBeMatchedBy('.some-class')
