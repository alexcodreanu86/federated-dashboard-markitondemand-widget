namespace("Stock.Widgets")

class Stock.Widgets.Templates
  @renderForm: ->
    _.template("""
                <div class='widget' data-id="stock-widget-wrapper">
                  <div class='widget-header'>
                    <h2 class="widget-title">Stock</h2>
                    <span class='widget-close' data-id='stock-close'>×</span>
                    <div class="widget-form" data-id="stock-form">
                      <input name="stock-search" type="text">
                      <button data-id="stock-button">Get Stock Data</button><br>
                    </div>
                  </div>
                  <div class="widget-body" data-id="stock-output"></div>
                </div>
              """)

