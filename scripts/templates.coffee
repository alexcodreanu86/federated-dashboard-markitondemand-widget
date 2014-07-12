namespace('Stock')

class Stock.Templates
  @renderForm: ->
    _.template("""
                <div class='widget' data-id="stock-widget-wrapper">
                  <div class='widget-header'>
                    <h2 class="widget-title">Stock</h2>
                    <div class="widget-form" data-id="stock-form">
                      <input name="stock-search" type="text">
                      <button data-id="stock-button">Get Stock Data</button><br>
                    </div>
                  </div>
                  <div data-id="stock-output"></div>
                </div>
              """)

  @renderLogo: (imgData) ->
    _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {imgData: imgData})
