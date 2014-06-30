#Federated Dashboard markitondemand-widget

To install this package you can just add markitondemand-widget: ">0.0.0" to your dependencies in your bower.json file or by executing bower install markitondemand-widget in the terminal inside your project directory.

To use the widget just add the dist/federated-dashboard-markitondemand-widget.js to your html file. If you have the widget in the bower_components directory. You can just copy the next script tag into the <head> of your html file:

```html
<script src="/bower_components/markitondemand-widget/dist/federated-dashboard-markitondemand-widget.js"></script>
```

Now all you have to do is call `Stock.Controller.setupWidgetIn('.container')` where `.container` can be any desired JQuery selector that you want to serve as the container of the widget.

Credits:
HighStock from [HighCharts](http://www.highcharts.com) is used for the charts.

Markit On Demand [API](http://dev.markitondemand.com/) is used to get stock data.

Logo: Increase by Rediffusion from The Noun Project
