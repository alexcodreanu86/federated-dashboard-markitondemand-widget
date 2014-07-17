(function() {
  var container1, container2, mockResponse, newDisplay, setupOneContainer, setupTwoContainers;

  setupOneContainer = function() {
    return setFixtures(" <div data-id='widget-container-1'></div>");
  };

  setupTwoContainers = function() {
    return setFixtures("<div data-id='widget-container-1'></div>\n<div data-id='widget-container-2'></div>");
  };

  newDisplay = function(container) {
    return new Stock.Widgets.Display(container);
  };

  container1 = "[data-id=widget-container-1]";

  container2 = "[data-id=widget-container-2]";

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

  describe("Stock.Widget.Display", function() {
    it("stores the container it is initialized with", function() {
      var display;
      display = newDisplay(container1);
      return expect(display.container).toEqual(container1);
    });
    it("setupWidget is setting up the widget in it's container", function() {
      var display;
      display = newDisplay(container1);
      setupOneContainer();
      display.setupWidget();
      return expect(container1).toContainElement('.widget .widget-header');
    });
    it("getInput returns the input in the field in it's own container", function() {
      var display1, display2;
      setupTwoContainers();
      display1 = newDisplay(container1);
      display2 = newDisplay(container2);
      display1.setupWidget();
      display2.setupWidget();
      $("" + container1 + " [name=stock-search]").val("text1");
      $("" + container2 + " [name=stock-search]").val("text2");
      expect(display1.getInput()).toEqual("text1");
      return expect(display2.getInput()).toEqual("text2");
    });
    it("showChart adds the chart to the given container", function() {
      var display;
      display = newDisplay(container1);
      setupOneContainer();
      display.setupWidget();
      display.showChart(mockResponse);
      return expect($('[data-id=stock-output]')).toContainElement('.highcharts-container');
    });
    it("hideForm is hiding the form", function() {
      var display;
      setupOneContainer();
      display = newDisplay(container1);
      display.setupWidget();
      display.hideForm();
      return expect($("" + container1 + " [data-id=stock-form]").attr('style')).toEqual('display: none;');
    });
    it("showForm is showing the form", function() {
      var display;
      setupOneContainer();
      display = newDisplay(container1);
      display.setupWidget();
      display.hideForm();
      display.showForm();
      return expect($("" + container1 + " [data-id=stock-form]").attr('style')).not.toEqual('display: none;');
    });
    return it("removeWidget is removing the widget's content", function() {
      var display;
      setupOneContainer();
      display = newDisplay(container1);
      display.setupWidget();
      display.removeWidget();
      return expect($(container1)).not.toContainElement("[data-id=stock-widget-wrapper]");
    });
  });

}).call(this);
