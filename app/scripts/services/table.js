'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.services:TableService
 * @description
 * # TableService
 * Services of the databaseDictionaryBuildApp
 */
angular
  .module('databaseDictionaryBuildApp.services')
  .factory('TableService', ['$resource', '$http', '$q', function ($resource, $http, $q) {
    var tableRows = [],
    resArr = {},
    resSqlArr = {},
    tablesData = {},
    tablesSqlData = {}
    ;

      var getRes = function ( tbName ) {
        if(!resArr[tbName]) {
          resArr[tbName] = $resource( 'data/table_info/'+tbName+'.json',null,{
            timeout: 20000
          });
        }

        return resArr[tbName];
      };

      var getSqlRes = function (tbName, defer) {
        $http
          .get('data/sql/'+tbName+'.sql')
          .success(function (data) {
            defer.resolve(data);
          });
      };

    return {
      get: function (tbName) {
        return getRes(tbName)
                .get(null, function (data) {
                  if(data) {
                    tablesData[tbName] = data;
                  }
                });
      },
      getSql : function (tbName) {
        var resDefer = $q.defer();
          getSqlRes(tbName, resDefer);

        return {
          $promise: resDefer.promise
        };
      }
    };
  }]);
