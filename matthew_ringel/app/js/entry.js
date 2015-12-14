require('angular/angular');
var angular = window.angular;

var cryptidMatchApp = angular.module('CryptidMatchApp', []);
require('./services/services')(cryptidMatchApp);
require('./directives/directives')(cryptidMatchApp);


require('./cryptids/cryptids')(cryptidMatchApp);
