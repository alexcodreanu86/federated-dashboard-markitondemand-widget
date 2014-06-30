(function() {
  namespace('Stock');

  Stock.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<input name=\"stock-search\" type=\"text\"><br>\n<button id=\"stock\" data-id=\"stock-button\">Get Stock Data</button><br>\n<div data-id=\"stock-output\"></div>");
    };

    Templates.renderLogo = function(imgData) {
      return _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {
        imgData: imgData
      });
    };

    return Templates;

  })();

}).call(this);
