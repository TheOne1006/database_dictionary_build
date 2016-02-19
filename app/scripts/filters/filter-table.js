'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.filter:filter-table
 * @description
 * # filter-table
 * filter of the databaseDictionaryBuildApp
 */
 angular
  .module('databaseDictionaryBuildApp.filters')
  .filter('filterTable',['$filter', function($filter) {
    var chineseRegExp = /.*[\u4e00-\u9fa5]+.*$/;

    return function(resArr, keyWord) {

    // 筛选
    if(!angular.isArray(resArr) || resArr.length === 0 || !angular.isString(keyWord) || keyWord === '') {
     return resArr;
    }

    // type : all, tableComment, tableName
    var keyWordType = 'all',
      strRegExp,
      matchRegExpObj;

    if(chineseRegExp.test(keyWord)) {
      keyWordType = 'tableComment';
    }

    /**
     * 拆分keyWord
     */
    strRegExp = ".*?"+keyWord.split("").join(".*?")+".*?";

    matchRegExpObj = new RegExp(strRegExp,'i');

    // 模糊匹配, 效率问题

    angular.forEach(resArr, function (item, key) {
      var tbName = item.Name;
      if(matchRegExpObj.test(tbName)) {
        console.log(tbName);
      }
    });













     console.log('123');
      return ['1','2','3'];
   };
  }]);
