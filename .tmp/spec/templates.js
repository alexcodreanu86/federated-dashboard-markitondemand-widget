(function() {
  var appendToSandbox, setSandbox;

  appendToSandbox = function(htmlToAppend) {
    return $('#sandbox').html(htmlToAppend);
  };

  setSandbox = function() {
    return setFixtures(sandbox());
  };

  describe("Stock.Templates", function() {
    return it("renderForm returns the proper html", function() {
      var formHtml;
      formHtml = Stock.Templates.renderForm();
      setSandbox();
      appendToSandbox(formHtml);
      expect($('[data-id=stock-form]')).toContainElement('[data-id=close-stock-widget]');
      expect($('[data-id=stock-form]')).toContainElement('[name=stock-search]');
      expect($('[data-id=stock-form]')).toContainElement('[data-id=stock-button]');
      return expect($('[data-id=stock-output]')).toBeInDOM();
    });
  });

}).call(this);
