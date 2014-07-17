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
