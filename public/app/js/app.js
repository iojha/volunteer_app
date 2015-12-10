'use strict';


// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/modals', {templateUrl: 'app/partials/modals.html', controller: 'ModalsCtrl'});
        $routeProvider.when('/icons', {templateUrl: 'app/partials/icons.html', controller: 'IconsCtrl'});
        $routeProvider.when('/charts', {templateUrl: 'app/partials/charts.html', controller: 'ChartCtrl'});
        $routeProvider.when('/forms', {templateUrl: 'app/partials/forms.html', controller: 'FormsCtrl'});
        $routeProvider.when('/home', {templateUrl: 'app/partials/home.html', controller: 'AppCtrl'});
        $routeProvider.when('/register', {
            templateUrl: 'app/partials/register.html', 
            controller: 'RegistrationCtrl'
        });
        $routeProvider.when('/login', {
            templateUrl: 'app/partials/login.html', 
            controller: 'AppCtrl'
        });
        $routeProvider.when('/searchresults', {
            templateUrl: 'app/partials/searchresults.html', 
            controller: 'AppCtrl'
        });
        
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
