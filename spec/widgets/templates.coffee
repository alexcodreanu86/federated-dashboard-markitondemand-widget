appendToSandbox = (htmlToAppend) ->
  $('#sandbox').html(htmlToAppend)

setSandbox = ->
  setFixtures(sandbox())

describe "Stock.Widgets.Templates", ->
  it "renderForm returns the proper html", ->
    formHtml = Stock.Widgets.Templates.renderForm()
    setSandbox()
    appendToSandbox(formHtml)
    expect($('[data-id=stock-form]')).toContainElement('[name=stock-search]')
    expect($('[data-id=stock-form]')).toContainElement('[data-id=stock-button]')
    expect($('[data-id=stock-output]')).toBeInDOM()