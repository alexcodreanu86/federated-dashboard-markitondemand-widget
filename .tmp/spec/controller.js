(function() {
  var clickOn, container1, container2, inputInto, mockResponse, resetWidgetsContainer, setSandbox, setupStockFixtures, setupTwoContainers;

  setupStockFixtures = function() {
    return setFixtures("<input name=\"stock-search\" type=\"text\">\n<button data-id=\"stock-button\"></button>\n<div data-id=\"stock-output\"></div>");
  };

  mockResponse = {
    Dates: ["2014-04-30T00:00:00", "2014-05-01T00:00:00", "2014-06-01T00:00:00"],
    Elements: [
      {
        Symbol: "AAPL",
        Type: "price",
        DataSeries: {
          close: {
            values: [84.298, 84.497, 86.654]
          }
        }
      }
    ]
  };

  inputInto = function(name, value) {
    return $("[name=" + name + "]").val(value);
  };

  clickOn = function(element) {
    return $(element).click();
  };

  clickOn = function(element) {
    return $(element).click();
  };

  resetWidgetsContainer = function() {
    return Stock.Controller.widgets = [];
  };

  setSandbox = function() {
    return setFixtures(sandbox());
  };

  setupTwoContainers = function() {
    return setFixtures("<div data-id='widget-container-1'></div>\n<div data-id='widget-container-2'></div>");
  };

  container1 = "[data-id=widget-container-1]";

  container2 = "[data-id=widget-container-2]";

  describe("Stock.Controller", function() {
    it("widgets container is empty on initialization", function() {
      var container;
      resetWidgetsContainer();
      container = Stock.Controller.getWidgets();
      return expect(container.length).toBe(0);
    });
    it("setupWidgetIn is setting up a widget instance in the desired element", function() {
      var html;
      resetWidgetsContainer();
      setSandbox();
      Stock.Controller.setupWidgetIn('#sandbox', "123456");
      html = $('#sandbox');
      expect(html).toContainElement('[name=stock-search]');
      expect(html).toContainElement('[data-id=stock-button]');
      return expect(html).toContainElement('[data-id=stock-output]');
    });
    it("setupWidgetIn is adding the initialized widget to the widgets container", function() {
      resetWidgetsContainer();
      setSandbox();
      Stock.Controller.setupWidgetIn('#sandbox', "123456");
      return expect(Stock.Controller.getWidgets().length).toEqual(1);
    });
    it("hideForms is hiding the forms of all the widgets that are initialized", function() {
      resetWidgetsContainer();
      setupTwoContainers();
      Stock.Controller.setupWidgetIn(container1, "123456");
      Stock.Controller.setupWidgetIn(container2, "123456");
      Stock.Controller.hideForms();
      expect($("" + container1 + " [data-id=stock-form]").attr('style')).toEqual('display: none;');
      return expect($("" + container2 + " [data-id=stock-form]").attr('style')).toEqual('display: none;');
    });
    it("showForms is showing the forms of all the widgets that are initialized", function() {
      resetWidgetsContainer();
      setupTwoContainers();
      Stock.Controller.setupWidgetIn(container1, "123456");
      Stock.Controller.setupWidgetIn(container2, "123456");
      Stock.Controller.hideForms();
      Stock.Controller.showForms();
      expect($("" + container1 + " [data-id=stock-form]").attr('style')).not.toEqual('display: none;');
      return expect($("" + container2 + " [data-id=stock-form]").attr('style')).not.toEqual('display: none;');
    });
    it("closeWidgetInContainer will eliminate the widget from the given container", function() {
      resetWidgetsContainer();
      setupTwoContainers();
      Stock.Controller.setupWidgetIn(container1, "123456");
      Stock.Controller.setupWidgetIn(container2, "123456");
      Stock.Controller.closeWidgetInContainer(container1);
      expect($("" + container1 + " [data-id=stock-form]")).not.toBeInDOM();
      return expect($("" + container2 + " [data-id=stock-form]")).toBeInDOM();
    });
    return it("closeWidgetInContainer will remove the widget from the widgets container", function() {
      resetWidgetsContainer();
      setupTwoContainers();
      Stock.Controller.setupWidgetIn(container1, "123456");
      Stock.Controller.setupWidgetIn(container2, "123456");
      Stock.Controller.closeWidgetInContainer(container1);
      return expect(Stock.Controller.getWidgets().length).toEqual(1);
    });
  });

}).call(this);
