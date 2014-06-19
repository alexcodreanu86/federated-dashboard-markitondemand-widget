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
