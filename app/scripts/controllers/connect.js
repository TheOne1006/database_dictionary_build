'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the databaseDictionaryBuildApp
 */
angular.module('databaseDictionaryBuildApp.controllers')
  .controller('ConnectCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {
      host: '',
      tabName: ''
    };

    // $scope.loginSubmit = function () {
    //   $http.post('/admin/login/verify/password',{user:$scope.user}).success(function  (data) {
    //     console.log(data);
    // });

  }]);
