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
  .factory('TableService', ['$resource', function ($resource) {
    var tableRows = [],
    resArr = {},
    tablesData = {}
    ;

      var getRes = function ( tbName ) {
        if(!resArr[tbName]) {
          resArr[tbName] = $resource( '/data/table_info/'+tbName+'.json',null,{
            timeout: 20000
          });
        }

        return resArr[tbName];
      };

    return {
      get: function (tbName) {
          return getRes(tbName).get(null, function (data) {
            if(data) {
              tablesData[tbName] = data;
            }
          });
      }
    };
  }]);
