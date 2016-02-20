'use strict';

/**
 * 模块依赖
 */
 angular.module('databaseDictionaryBuildApp.services', ['ngResource']);
 angular.module('databaseDictionaryBuildApp.controllers', ['databaseDictionaryBuildApp.services']);
 angular.module('databaseDictionaryBuildApp.filters', []);
 angular.module('ui.flat', []);


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
    'ngSanitize',
    'ui.router',
    'databaseDictionaryBuildApp.controllers',
    'databaseDictionaryBuildApp.services',
    'databaseDictionaryBuildApp.filters',
    'ui.flat',
    'ui.codemirror'
  ])
  // <div ui-view=""></div>
  .config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main',{
        url: '',
        abstract: true,
      })
      .state('main.index', {
        url:'/',
        views:{
          '@' : {
            templateUrl: 'views/main.html',
            controller: 'TablesCtrl'
          }
        }
      })
      .state('main.table',{
        url:'/table/:tbName',
        views:{
          '@':{
            templateUrl: 'views/table.html',
            controller: 'TableCtrl'
          }
        }
      })
      .state('about',{
        url:'/about',
        views:{
          '@':{
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
          }
        }
      })
      .state('help',{
        url: '/help',
        views: {
          '@':{
            templateUrl: 'views/help.html',
            controller: 'HelpCtrl'
          }
        }
      })
      ;

      // 不知道名连接跳转
        $urlRouterProvider.otherwise('/');
  }]);
  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl',
  //       controllerAs: 'main'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl',
  //       controllerAs: 'about'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
