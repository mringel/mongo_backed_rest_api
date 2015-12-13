module.exports = function(app) {
  app.directive('textBox', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/text_box_directive.html',
      transclude: true,
      scope: {
        heading: '@'
      }
    };
  });
};
