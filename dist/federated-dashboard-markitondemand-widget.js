(function(underscore) {
  'use strict';

  window.namespace = function(string, obj) {
    var current = window,
        names = string.split('.'),
        name;

    while((name = names.shift())) {
      current[name] = current[name] || {};
      current = current[name];
    }

    underscore.extend(current, obj);

  };

}(window._));

(function() {
  namespace('Stock');

  Stock.API = (function() {
    function API() {}

    API.loadChartData = function(symbols, callback) {
      var params;
      params = {
        parameters: JSON.stringify(this.prepareParams(symbols))
      };
      return $.ajax({
        data: params,
        url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
        dataType: "jsonp",
        context: this,
        success: callback
      });
    };

    API.prepareParams = function(symbols) {
      var elements;
      elements = this.generateElements(symbols);
      return {
        Normalized: false,
        NumberOfDays: 60,
        DataPeriod: "Day",
        Elements: elements
      };
    };

    API.generateElements = function(symbols) {
      var elements, symbol, _i, _len;
      elements = [];
      for (_i = 0, _len = symbols.length; _i < _len; _i++) {
        symbol = symbols[_i];
        elements.push({
          Symbol: symbol,
          Type: "price",
          Params: ["c"]
        });
      }
      return elements;
    };

    return API;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.Controller = (function() {
    function Controller() {}

    Controller.widgets = [];

    Controller.setupWidgetIn = function(container, apiKey) {
      var widget;
      widget = new Stock.Widgets.Controller(container, apiKey);
      widget.initialize();
      return this.addToWidgetsContainer(widget);
    };

    Controller.addToWidgetsContainer = function(widget) {
      return this.widgets.push(widget);
    };

    Controller.getWidgets = function() {
      return this.widgets;
    };

    Controller.hideForms = function() {
      return this.allWidgetsExecute("hideForm");
    };

    Controller.showForms = function() {
      return this.allWidgetsExecute("showForm");
    };

    Controller.allWidgetsExecute = function(command) {
      return _.each(this.widgets, function(widget) {
        return widget[command]();
      });
    };

    Controller.closeWidgetInContainer = function(container) {
      var widget;
      widget = _.filter(this.widgets, function(widget, index) {
        return widget.container === container;
      })[0];
      if (widget) {
        this.removeWidgetContent(widget);
        return this.removeFromWidgetsContainer(widget);
      }
    };

    Controller.removeFromWidgetsContainer = function(widgetToRemove) {
      return this.widgets = _.reject(this.widgets, function(widget) {
        return widget === widgetToRemove;
      });
    };

    Controller.removeWidgetContent = function(widget) {
      return widget.removeContent();
    };

    return Controller;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.Display = (function() {
    function Display() {}

    Display.logoSrc = "https://raw.githubusercontent.com/bwvoss/federated-dashboard-markitondemand-widget/master/lib/icon_29406/stock_icon.png";

    Display.generateLogo = function(config) {
      var logoSrc;
      logoSrc = this.logoSrc;
      _.extend(config, {
        imgSrc: logoSrc
      });
      return Stock.Templates.renderLogo(config);
    };

    return Display;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<div class='widget' data-id=\"stock-widget-wrapper\">\n  <div class='widget-header'>\n    <h2 class=\"widget-title\">Stock</h2>\n    <div class=\"widget-form\" data-id=\"stock-form\">\n      <input name=\"stock-search\" type=\"text\">\n      <button data-id=\"stock-button\">Get Stock Data</button><br>\n    </div>\n  </div>\n  <div class=\"widget-body\" data-id=\"stock-output\"></div>\n</div>");
    };

    Templates.renderLogo = function(imgData) {
      return _.template("<img src='<%= imgData['imgSrc'] %>' data-id='<%= imgData['dataId'] %>' style='width: <%= imgData['width'] %>px'/>", {
        imgData: imgData
      });
    };

    return Templates;

  })();

}).call(this);

(function() {
  namespace('Stock.Widgets');

  Stock.Widgets.API = (function() {
    function API() {}

    API.loadChartData = function(symbols, callback) {
      var params;
      params = {
        parameters: JSON.stringify(this.prepareParams(symbols))
      };
      return $.ajax({
        data: params,
        url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
        dataType: "jsonp",
        context: this,
        success: callback
      });
    };

    API.prepareParams = function(symbols) {
      var elements;
      elements = this.generateElements(symbols);
      return {
        Normalized: false,
        NumberOfDays: 60,
        DataPeriod: "Day",
        Elements: elements
      };
    };

    API.generateElements = function(symbols) {
      var elements, symbol, _i, _len;
      elements = [];
      for (_i = 0, _len = symbols.length; _i < _len; _i++) {
        symbol = symbols[_i];
        elements.push({
          Symbol: symbol,
          Type: "price",
          Params: ["c"]
        });
      }
      return elements;
    };

    return API;

  })();

}).call(this);

(function() {
  namespace("Stock.Widgets");

  Stock.Widgets.Controller = (function() {
    var apiKey;

    apiKey = void 0;

    function Controller(container, key) {
      apiKey = key;
      this.container = container;
      this.display = new Stock.Widgets.Display(container);
    }

    Controller.prototype.initialize = function() {
      this.display.setupWidget();
      return this.bind();
    };

    Controller.prototype.getContainer = function() {
      return this.container;
    };

    Controller.prototype.bind = function() {
      return $("" + this.container + " [data-id=stock-button]").click((function(_this) {
        return function() {
          return _this.getStockData();
        };
      })(this));
    };

    Controller.prototype.getStockData = function(searchStr) {
      var symbols;
      symbols = this.processInput();
      return Stock.Widgets.API.loadChartData(symbols, Stock.Display.showChart);
    };

    Controller.prototype.processInput = function() {
      var input;
      input = this.display.getInput();
      return input.split(/\s+/);
    };

    Controller.prototype.hideForm = function() {
      return this.display.hideForm();
    };

    Controller.prototype.showForm = function() {
      return this.display.showForm();
    };

    Controller.prototype.removeContent = function() {
      return this.display.removeWidget();
    };

    return Controller;

  })();

}).call(this);

(function() {
  namespace('Stock.Widgets');

  Stock.Widgets.DataFormater = (function() {
    function DataFormater() {}

    DataFormater.formatData = function(stockObj, container) {
      return {
        rangeSelector: {
          selected: 1,
          inputEnabled: $(container).width() > 480
        },
        title: {
          text: "Stock Prices"
        },
        series: this.generateSeriesData(stockObj)
      };
    };

    DataFormater.generateSeriesData = function(response) {
      var element, series, _i, _len, _ref;
      series = [];
      _ref = response.Elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        series.push(this.formatElementObj(element, response.Dates));
      }
      return series;
    };

    DataFormater.formatElementObj = function(element, dates) {
      return {
        name: element.Symbol,
        data: this.formatElementData(dates, element.DataSeries.close.values),
        tooltip: {
          valueDecimals: 2
        }
      };
    };

    DataFormater.formatElementData = function(dates, prices) {
      var data, i, _i, _ref;
      data = [];
      for (i = _i = 0, _ref = dates.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        data.push([new Date(dates[i]).valueOf(), prices[i]]);
      }
      return data;
    };

    return DataFormater;

  })();

}).call(this);

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
