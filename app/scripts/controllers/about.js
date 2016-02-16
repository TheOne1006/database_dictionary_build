'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the databaseDictionaryBuildApp
 */
angular
  .module('databaseDictionaryBuildApp.controllers')
  .controller('AboutCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
