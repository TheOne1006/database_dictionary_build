'use strict';

/**
 * 模块依赖
 */
 angular.module('databaseDictionaryBuildApp.services', ['ngResource']);
 angular.module('databaseDictionaryBuildApp.controllers', ['databaseDictionaryBuildApp.services']);
 angular.module('databaseDictionaryBuildApp.filters', []);
 angular.module('databaseDictionaryBuildApp.router', ['ui.router']);
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
    'databaseDictionaryBuildApp.router',
    'ui.flat',
    'ui.codemirror'
  ]);
