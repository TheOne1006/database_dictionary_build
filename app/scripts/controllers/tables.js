'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.controller:TablesCtrl
 * @description
 * # TablesCtrl
 * Controller of the databaseDictionaryBuildApp
 */
angular.module('databaseDictionaryBuildApp.controllers')
  .controller('TablesCtrl',['$scope','$filter', 'TablesService' , function ($scope,  $filter, TablesService) {
    var keyWorld = '';
    $scope.list = [];

    TablesService
      .get()
      .$promise
      .then(function (data) {
        $scope.list = data;
      });

    // 接受父级ctrl 传播信息
    $scope.$on('changKeyWord', function (d ,keyWord) {
      TablesService
        .get()
        .$promise
        .then(function (data) {
          var list = $filter('filterTable')(data, keyWord);
          $scope.list = list;
        });
    });







  }]);
