namespace('Stock')

class Stock.Templates
  @renderForm: ->
    _.template("""
                <input name="stock-search" type="text"><br>
                <button id="stock" data-id="stock-button">Get Stock Data</button><br>
                <div data-id="stock-output"></div>
              """)

  @renderLogo: (imgData) ->
    _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {imgData: imgData})
