'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.controller:TablesCtrl
 * @description
 * # TablesCtrl
 * Controller of the databaseDictionaryBuildApp
 */
angular.module('databaseDictionaryBuildApp.controllers')
  .controller('TablesCtrl',['$scope', 'TablesService', function ($scope, TablesService) {
    $scope.list = [];

    TablesService
      .get()
      .$promise
      .then(function (data) {
        $scope.list = data;
      });
    
  }]);
