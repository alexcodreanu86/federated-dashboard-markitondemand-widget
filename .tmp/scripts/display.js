(function() {
  namespace('Stock');

  Stock.Display = (function() {
    function Display() {}

    Display.getInput = function() {
      return $('[name=stock-search]').val();
    };

    Display.showFormIn = function(container) {
      var formHtml;
      formHtml = Stock.Templates.renderForm();
      return $(container).html(formHtml);
    };

    Display.logoSrc = "https://raw.githubusercontent.com/bwvoss/federated-dashboard-markitondemand-widget/master/lib/icon_29406/stock_icon.png";

    Display.generateLogo = function(config) {
      var logoSrc;
      logoSrc = this.logoSrc;
      _.extend(config, {
        imgSrc: logoSrc
      });
      return Stock.Templates.renderLogo(config);
    };

    Display.showChart = function(stockResponse) {
      var formatedResponse;
      formatedResponse = Stock.DataFormater.formatData(stockResponse, "[data-id=stock-output]");
      return $("[data-id=stock-output]").highcharts('StockChart', formatedResponse);
    };

    Display.hideForm = function() {
      return $('[data-id=stock-form]').hide();
    };

    Display.showForm = function() {
      return $('[data-id=stock-form]').show();
    };

    return Display;

  })();

}).call(this);
