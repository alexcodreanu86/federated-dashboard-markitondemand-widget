(function() {
  namespace('Stock');

  Stock.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<div class='widget' data-id=\"stock-widget-wrapper\">\n  <div class='widget-header'>\n    <h2 class=\"widget-title\">Stock</h2>\n    <div class=\"widget-form\" data-id=\"stock-form\">\n      <input name=\"stock-search\" type=\"text\">\n      <button data-id=\"stock-button\">Get Stock Data</button><br>\n    </div>\n  </div>\n  <div data-id=\"stock-output\"></div>\n</div>");
    };

    Templates.renderLogo = function(imgData) {
      return _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {
        imgData: imgData
      });
    };

    return Templates;

  })();

}).call(this);
