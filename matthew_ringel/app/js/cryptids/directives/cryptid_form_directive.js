module.exports = function(app) {
  app.directive('cryptidFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/cryptid_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        cryptid: '=',
        action: '&'
      }
    };
  });
};
