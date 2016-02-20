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
    // 初始化
    $scope.keyWorld = '';

    $scope.$watch('keyWorld', function (nextVal, preVal) {
      // 向下传播
      $scope.$broadcast('changKeyWord', nextVal);
    });

    $scope.$on('$viewContentLoaded',function(){
      if($scope.keyWorld) {
        // 向下传播
        $scope.$broadcast('changKeyWord', $scope.keyWorld);
      }
    });
  }]);
