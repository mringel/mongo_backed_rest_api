require('angular/angular');
var angular = window.angular;

var cryptidApp = angular.module('cryptidlove', []);

cryptidApp.controller('NameController', ['$scope', function($scope) {
  $scope.name = '<enter your name here>';

}]);
