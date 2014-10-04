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

    Controller.setupWidgetIn = function(settings) {
      return new Stock.Widgets.Controller(settings).initialize();
    };

    return Controller;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.Display = (function() {
    function Display() {}

    Display.generateLogo = function(config) {
      return "<i class=\"fa fa-bar-chart-o " + config["class"] + "\" data-id=\"" + config.dataId + "\"></i>";
    };

    return Display;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.Templates = (function() {
    function Templates() {}

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

    API.loadChartData = function(symbols, displayer) {
      var params;
      params = {
        parameters: JSON.stringify(this.prepareParams(symbols))
      };
      return $.ajax({
        data: params,
        url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
        dataType: "jsonp",
        context: this,
        success: function(response) {
          return displayer.showChart(response);
        }
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

    function Controller(settings) {
      apiKey = settings.key;
      this.container = settings.container;
      this.display = new Stock.Widgets.Display(this.container, settings.animationSpeed);
      this.defaultValue = settings.defaultValue;
      this.activeStatus = false;
    }

    Controller.prototype.initialize = function() {
      this.display.setupWidget();
      this.bind();
      this.displayDefault();
      return this.setAsActive();
    };

    Controller.prototype.displayDefault = function() {
      if (this.defaultValue) {
        return this.loadStockData(this.defaultValue);
      }
    };

    Controller.prototype.setAsActive = function() {
      return this.activeStatus = true;
    };

    Controller.prototype.setAsInactive = function() {
      return this.activeStatus = false;
    };

    Controller.prototype.isActive = function() {
      return this.activeStatus;
    };

    Controller.prototype.bind = function() {
      $("" + this.container + " [data-name=widget-form]").on('submit', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.getStockData();
        };
      })(this));
      return $("" + this.container + " [data-name=widget-close]").on('click', (function(_this) {
        return function() {
          return _this.closeWidget();
        };
      })(this));
    };

    Controller.prototype.getStockData = function() {
      var input;
      input = this.display.getInput();
      return this.loadStockData(input);
    };

    Controller.prototype.loadStockData = function(input) {
      var symbols;
      symbols = this.processInput(input);
      return Stock.Widgets.API.loadChartData(symbols, this.display);
    };

    Controller.prototype.processInput = function(input) {
      return input.split(/\s+/);
    };

    Controller.prototype.closeWidget = function() {
      this.unbind();
      this.removeContent();
      return this.setAsInactive();
    };

    Controller.prototype.removeContent = function() {
      return this.display.removeWidget();
    };

    Controller.prototype.unbind = function() {
      $("" + this.container + " [data-name=widget-form]").unbind('submit');
      return $("" + this.container + " [data-name=widget-close]").unbind('click');
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
    function Display(container, animationSpeed) {
      this.container = container;
      this.animationSpeed = animationSpeed;
    }

    Display.prototype.setupWidget = function() {
      var widgetHtml;
      widgetHtml = Stock.Widgets.Templates.renderForm();
      return $(this.container).append(widgetHtml);
    };

    Display.prototype.getInput = function() {
      return $("" + this.container + " [name=widget-input]").val();
    };

    Display.prototype.showChart = function(stockResponse) {
      var formatedResponse;
      formatedResponse = Stock.Widgets.DataFormater.formatData(stockResponse, "[data-name=widget-output]");
      return $("" + this.container + " [data-name=widget-output]").highcharts('StockChart', formatedResponse);
    };

    Display.prototype.removeWidget = function() {
      return $(this.container).remove();
    };

    return Display;

  })();

}).call(this);

(function() {
  namespace("Stock.Widgets");

  Stock.Widgets.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<div class='widget' data-name='widget-wrapper'>\n  <div class='widget-header' data-name='sortable-handle'>\n    <h2 class=\"widget-title\">Stock</h2>\n    <span class='widget-close' data-name='widget-close'>×</span>\n    <form class='widget-form' data-name='widget-form'>\n      <input name='widget-input' type='text' autofocus='true'>\n      <button data-name=\"form-button\">Get Stock Data</button><br>\n    </form>\n  </div>\n  <div class=\"widget-body\" data-name=\"widget-output\"></div>\n</div>", {});
    };

    return Templates;

  })();

}).call(this);
