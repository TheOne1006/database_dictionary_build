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
    'ngSanitize',
    'ui.router',
    'databaseDictionaryBuildApp.controllers'
  ])
  // <div ui-view=""></div>
  .config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main',{
        url:'/',
        views:{
          '@':{
              templateUrl: 'views/main.html',
              controller: 'MainCtrl',
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
      .state('table',{
        url:'/table/:tbName',
        views:{
          '@':{
            templateUrl: 'views/table.html'
          }
        }
      })
      ;

      // 不知道名连接跳转
        $urlRouterProvider.otherwise('/about');
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

  /**
   * 模块依赖
   */
  angular.module('databaseDictionaryBuildApp.controllers', ['ngResource']);
