'use strict';

/**
 * @ngdoc overview
 * @name databaseDictionaryBuildApp
 * @description
 * # databaseDictionaryBuildApp
 *
 * router of the application.
 */
angular
  .module('databaseDictionaryBuildApp.router')
  // <div ui-view=""></div>
  .config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main',{
        url: '',
        abstract: true
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
            controller: 'AboutCtrl'
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
      });

      // 不知道名连接跳转
        $urlRouterProvider.otherwise('/');
  }]);
