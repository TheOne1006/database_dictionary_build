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
  .factory('TablesService', ['$resource', function ($resource) {
    var allTables = [],
      keyWord = '',
      resource = $resource('/data/all_tables.json',null,{
        timeout: 20000
      });

    return {
      get: function () {
          return resource.query(null, function (data) {
            allTables = data;
          });
      },
      gets: function () {
        return ['1','2'];
      }
    };
  }]);
