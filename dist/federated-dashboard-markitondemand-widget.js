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

    Controller.bind = function() {
      return $('[data-id=stock-button]').click((function(_this) {
        return function() {
          return _this.getStockData();
        };
      })(this));
    };

    Controller.getStockData = function(searchStr) {
      var symbols;
      symbols = this.processInput();
      return Stock.API.loadChartData(symbols, Stock.Display.showChart);
    };

    Controller.processInput = function() {
      var input;
      input = Stock.Display.getInput();
      return input.split(/\s+/);
    };

    Controller.setupWidgetIn = function(selector) {
      Stock.Display.showFormIn(selector);
      return this.bind();
    };

    return Controller;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.DataFormater = (function() {
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

    return Display;

  })();

}).call(this);

(function() {
  namespace('Stock');

  Stock.Templates = (function() {
    function Templates() {}

    Templates.renderForm = function() {
      return _.template("<input name=\"stock-search\" type=\"text\"><br>\n<button id=\"stock\" data-id=\"stock-button\">Get Stock Data</button><br>\n<div data-id=\"stock-output\"></div>");
    };

    Templates.renderEmptyTable = function() {
      return _.template("<table data-id=\"stock-display\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Change</th>\n      <th>Change Percent</th>\n      <th>Change Percent YTD</th>\n      <th>High</th>\n      <th>Low</th>\n      <th>Last Price</th>\n      <th>Market Cap</th>\n      <th>Open</th>\n      <th>Symbol</th>\n      <th>Volume</th>\n      <th>Time Stamp</th>\n    </tr>\n  </thead>\n  <tbody data-id=\"stock-body\">\n  </tbody>\n</table>");
    };

    Templates.renderTableRow = function(stockObj) {
      return _.template("<tr>\n  <td><%= stockObj.name %></td>\n  <td><%= stockObj.change %></td>\n  <td><%= stockObj.changePercent %></td>\n  <td><%= stockObj.changePercentYTD %></td>\n  <td><%= stockObj.high %></td>\n  <td><%= stockObj.low %></td>\n  <td><%= stockObj.lastPrice %></td>\n  <td><%= stockObj.marketCap %></td>\n  <td><%= stockObj.open %></td>\n  <td><%= stockObj.symbol %></td>\n  <td><%= stockObj.volume %></td>\n  <td><%= stockObj.timestamp %></td>\n</tr>", {
        stockObj: stockObj
      });
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
  namespace('Stock');

  Stock.View = (function() {
    function View() {}

    View.getInput = function() {
      return $('[name=stock-search]').val();
    };

    View.outputData = function(stockObj) {
      var formatedObj, stockHtml;
      formatedObj = Stock.View.formatResponse(stockObj);
      stockHtml = Stock.Templates.renderTableRow(formatedObj);
      return $('[data-id=stock-body]').append(stockHtml);
    };

    View.resetTable = function() {
      var table;
      table = Stock.Templates.renderEmptyTable();
      return $('[data-id=stock-output]').html(table);
    };

    View.displayFormIn = function(container) {
      var formHtml;
      formHtml = Stock.Templates.renderForm();
      return $(container).html(formHtml);
    };

    View.formatResponse = function(response) {
      return {
        name: response.Name,
        symbol: response.Symbol,
        change: response.Change.toFixed(2),
        changePercent: response.ChangePercent.toFixed(2),
        changePercentYTD: response.ChangePercentYTD.toFixed(2),
        open: response.Open.toFixed(2),
        changeYTD: response.ChangeYTD.toFixed(2),
        high: response.High,
        lastPrice: response.LastPrice,
        low: response.Low,
        msDate: response.MSDate.toFixed(2),
        marketCap: response.MarketCap,
        open: response.Open,
        timestamp: response.Timestamp.substr(0, 18),
        volume: response.Volume
      };
    };

    return View;

  })();

}).call(this);
