require('angular/angular');
var angular = window.angular;

var cryptidMatchApp = angular.module('CryptidMatchApp', []);
require('./cryptids/cryptids')(cryptidMatchApp);
