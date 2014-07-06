namespace('Stock')

class Stock.Templates
  @renderForm: ->
    _.template("""
                <div data-id="stock-widget-wrapper">
                  <div data-id="stock-form">
                    <input name="stock-search" type="text"><button data-id="close-stock-widget">X</button><br>
                    <button data-id="stock-button">Get Stock Data</button><br>
                  </div>
                  <div data-id="stock-output"></div>
                </div>
              """)

  @renderLogo: (imgData) ->
    _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {imgData: imgData})
