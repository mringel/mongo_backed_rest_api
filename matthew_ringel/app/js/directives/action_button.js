module.exports = function(app) {
  app.directive('actionButton', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/action_button_directive.html',
      scope: {
        action: '&',
        buttonText: '@',
        cryptids: '=',
        key: '@'
      },
      controller: function($scope) {
        $scope.doAction = function() {
          $scope.action()($scope.cryptids, $scope.key);
        };
      }
    };
  });
};
