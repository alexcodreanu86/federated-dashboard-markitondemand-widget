namespace("Stock.Widgets")

class Stock.Widgets.Templates
  @renderForm: ->
    _.template("""
                  <div class='widget' data-name='widget-wrapper'>
                    <div class='widget-header' data-name='sortable-handle'>
                      <h2 class="widget-title">Stock</h2>
                      <span class='widget-close' data-name='widget-close'>×</span>
                      <form class='widget-form' data-name='widget-form'>
                        <input name='widget-input' type='text' autofocus='true'>
                        <button data-name="form-button">Get Stock Data</button><br>
                      </form>
                    </div>
                    <div class="widget-body" data-name="widget-output"></div>
                  </div>
                """, {})
