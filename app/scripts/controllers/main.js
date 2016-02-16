'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the databaseDictionaryBuildApp
 */
angular.module('databaseDictionaryBuildApp.controllers')
  .controller('MainCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma1'
    ];
  }]);
