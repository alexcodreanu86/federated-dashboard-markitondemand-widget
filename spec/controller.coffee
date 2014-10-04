describe "Stock.Controller", ->
  it "setupWidgetIn is setting up a widget instance in the desired element", ->
    setFixtures sandbox()
    Stock.Controller.setupWidgetIn({container: '#sandbox'})
    html = $('#sandbox')
    expect(html).toContainElement('[data-name=widget-close]')
    expect(html).toContainElement('[data-name=widget-form]')
    expect(html).toContainElement('[data-name=widget-output]')
