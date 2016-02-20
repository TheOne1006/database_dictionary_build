'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the databaseDictionaryBuildApp
 */
angular.module('databaseDictionaryBuildApp.controllers')
  .controller('TableCtrl',['$scope', '$stateParams', 'TableService', function ($scope, $stateParams, TableService) {
    $scope.showSql = false;
    
    $scope.table = [];

    TableService
      .get($stateParams.tbName)
      .$promise
      .then(function (data) {
        $scope.table = data;
      });

  }]);
