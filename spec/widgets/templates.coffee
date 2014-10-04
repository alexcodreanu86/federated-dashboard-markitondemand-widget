describe "Stock.Widgets.Templates", ->
  it "renderForm returns the proper html", ->
    formHtml = Stock.Widgets.Templates.renderForm()
    setFixtures sandbox()
    $('#sandbox').html(formHtml)
    expect($('#sandbox')).toContainElement('[data-name=widget-form]')
    expect($('#sandbox')).toContainElement('[data-name=widget-close]')
