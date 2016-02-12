'use strict';

/**
 * @ngdoc overview
 * @name databaseDictionaryBuildApp
 * @description
 * # databaseDictionaryBuildApp
 *
 * Main module of the application.
 */
angular
  .module('databaseDictionaryBuildApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
