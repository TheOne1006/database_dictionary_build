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

    $scope.table = {};
    $scope.sqlCreate = '';

    TableService
      .get($stateParams.tbName)
      .$promise
      .then(function (data) {
        $scope.table = data;
      });

    // sql
    TableService
      .getSql($stateParams.tbName)
      .$promise
      .then(function (data) {
        $scope.sqlCreate = data;
        // console.log(data);
      });

  }]);
