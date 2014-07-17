(function() {
  namespace("Stock.Widget");

  Stock.Widgets.Display = (function() {
    function Display(container) {
      this.container = container;
    }

    Display.prototype.setupWidget = function() {
      var widgetHtml;
      widgetHtml = Stock.Widgets.Templates.renderForm();
      return $(this.container).append(widgetHtml);
    };

    Display.prototype.getInput = function() {
      return $("" + this.container + " [name=stock-search]").val();
    };

    Display.prototype.showChart = function(stockResponse) {
      var formatedResponse;
      formatedResponse = Stock.Widgets.DataFormater.formatData(stockResponse, "[data-id=stock-output]");
      return $("" + this.container + " [data-id=stock-output]").highcharts('StockChart', formatedResponse);
    };

    Display.prototype.hideForm = function() {
      return $("" + this.container + " [data-id=stock-form]").hide();
    };

    Display.prototype.showForm = function() {
      return $("" + this.container + " [data-id=stock-form]").show();
    };

    Display.prototype.removeWidget = function() {
      return $("" + this.container + " [data-id=stock-widget-wrapper]").remove();
    };

    return Display;

  })();

}).call(this);
