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
  .filter('filterTable',['$filter' , function($filter) {
    var chineseRegExp = /[\u4e00-\u9fa5]/;

    return function(resArr, keyWord) {

    // 筛选
    if(!angular.isArray(resArr) || resArr.length === 0 || !angular.isString(keyWord) || keyWord === '') {
      return resArr;
    }

    // type : all, tableComment, tableName
    var keyWordType = 'all',
      strRegExp,
      matchRegExpObj,
      filterResult = [];

    if(chineseRegExp.test(keyWord)) {
      keyWordType = 'tableComment';
    }

    /**
     * 拆分keyWord
     */
    strRegExp = ".*?"+keyWord.split("").join(".*?")+".*?";

    matchRegExpObj = new RegExp(strRegExp,'i');

    // resArr 缓存

    // 模糊匹配, 效率问题
    angular.forEach(resArr, function (item) {
      var tbName = item.Name,
      tbComment = item.Comment || '',
      copyItem = angular.extend({}, item),
      needPush = false;

      if(keyWordType !== 'tableName' && matchRegExpObj.test(tbComment)) {
        needPush = true;
        copyItem.wrapComment = $filter('strWrapEle')(tbComment, keyWord, 'b');
        // console.log(tbComment);
      }

      // test 效率高于 matchAll
      if(keyWordType !== 'tableComment' && matchRegExpObj.test(tbName)) {
        needPush = true;
        copyItem.wrapName = $filter('strWrapEle')(tbName, keyWord, 'b');
        // console.log(tbName);
      }

      // 添加结果
      if(needPush) {
        filterResult.push(copyItem);
      }

    });

    return filterResult;
   };
  }]);
