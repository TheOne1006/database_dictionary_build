'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.services:TablesService
 * @description
 * # TablesService
 * Services of the databaseDictionaryBuildApp
 */
angular
  .module('databaseDictionaryBuildApp.services')
  .factory('TablesService', ['$resource' , '$q', function ($resource, $q) {
    var allTables = [],
      keyWord = '',
      resource = $resource('/data/all_tables.json',null,{
        timeout: 20000
      });

    // return Defer Object
    var getAllTables = function () {
      // 没有缓存 从服务器获取
      if(allTables.length === 0) {
        return resource.query(null, function (data) {
          allTables = data;
        });
      }else {
        // 缓存获取
        var allTableDefer = $q.defer();
        allTableDefer.resolve(allTables);

        return {
          $promise: allTableDefer.promise
        };


      }
    };

    return {
      get: getAllTables,
      gets: function () {
        return ['1','2'];
      }
    };
  }]);
