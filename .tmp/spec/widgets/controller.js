(function() {
  var clickOn, container, inputInto, mockResponse, newController, setupOneContainer;

  setupOneContainer = function() {
    return setFixtures("<div data-id='widget-container-1'></div>");
  };

  inputInto = function(name, value) {
    return $("[name=" + name + "]").val(value);
  };

  clickOn = function(element) {
    return $(element).click();
  };

  container = "[data-id=widget-container-1]";

  newController = function(container) {
    return new Stock.Widgets.Controller(container, "1243");
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

  describe("Stock.Widgets.Controller", function() {
    it("stores the container that it is initialized with", function() {
      var controller;
      controller = newController(container);
      return expect(controller.getContainer()).toEqual(container);
    });
    it("stores a new instance of Stock.Widget.Display when instantiated", function() {
      var controller;
      controller = newController(container);
      return expect(controller.display).toBeDefined();
    });
    it("initialize sets widget up in its container", function() {
      var controller;
      setupOneContainer();
      controller = newController(container);
      controller.initialize();
      return expect($(container)).not.toBeEmpty();
    });
    it("initialize is binding the controller", function() {
      var controller, spy;
      controller = newController(container);
      spy = spyOn(controller, 'bind');
      controller.initialize();
      return expect(spy).toHaveBeenCalled();
    });
    it("bind is displaying the stock when the button is clicked", function() {
      var controller;
      setupOneContainer();
      controller = newController(container);
      controller.initialize();
      inputInto('stock-search', 'AAPL GOOG MSFT');
      spyOn(Stock.Widgets.API, 'loadChartData').and.returnValue(controller.display.showChart(mockResponse));
      clickOn("" + container + " [data-id=stock-button]");
      expect($('[data-id=stock-output]')).toContainElement('.highcharts-container');
      return expect(Stock.Widgets.API.loadChartData).toHaveBeenCalled();
    });
    it("hideForm is hiding the form", function() {
      var controller;
      setupOneContainer();
      controller = newController(container);
      controller.initialize();
      controller.hideForm();
      return expect($("" + container + " [data-id=stock-form]").attr('style')).toEqual('display: none;');
    });
    it("showForm is showing the form", function() {
      var controller;
      setupOneContainer();
      controller = newController(container);
      controller.initialize();
      controller.hideForm();
      controller.showForm();
      return expect($("" + container + " [data-id=stock-form]").attr('style')).not.toEqual('display: none;');
    });
    return it("removeContent is removing the widget's content", function() {
      var controller;
      setupOneContainer();
      controller = newController(container);
      controller.initialize();
      controller.removeContent();
      return expect($(container)).not.toContainElement("[data-id=stock-widget-wrapper]");
    });
  });

}).call(this);
