(function() {
  namespace('Stock');

  Stock.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<div data-id=\"stock-widget-wrapper\">\n  <div data-id=\"stock-form\">\n    <input name=\"stock-search\" type=\"text\"><button data-id=\"close-stock-widget\">X</button><br>\n    <button data-id=\"stock-button\">Get Stock Data</button><br>\n  </div>\n  <div data-id=\"stock-output\"></div>\n</div>");
    };

    Templates.renderLogo = function(imgData) {
      return _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {
        imgData: imgData
      });
    };

    return Templates;

  })();

}).call(this);
