(function() {
  namespace("Stock.Widgets");

  Stock.Widgets.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<div class='widget' data-id=\"stock-widget-wrapper\">\n  <div class='widget-header'>\n    <h2 class=\"widget-title\">Stock</h2>\n    <div class=\"widget-form\" data-id=\"stock-form\">\n      <input name=\"stock-search\" type=\"text\">\n      <button data-id=\"stock-button\">Get Stock Data</button><br>\n    </div>\n  </div>\n  <div class=\"widget-body\" data-id=\"stock-output\"></div>\n</div>");
    };

    return Templates;

  })();

}).call(this);
