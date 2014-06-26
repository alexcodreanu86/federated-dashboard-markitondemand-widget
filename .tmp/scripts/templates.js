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
