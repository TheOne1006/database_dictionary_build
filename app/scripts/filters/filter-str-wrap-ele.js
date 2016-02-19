'use strict';

/**
 * @ngdoc function
 * @name databaseDictionaryBuildApp.filter:str-wrap-ele
 * @description
 * # str-wrap-ele
 * filter of the databaseDictionaryBuildApp
 */
 angular
  .module('databaseDictionaryBuildApp.filters')
  .filter('strWrapEle',[function() {
    return function (str, keyword , ele) {
      var wrapStrArr = [],
        wrapStr,
        strArr = str.split(""),
        keywordArr = keyword.split(""),
        strArrLen = strArr.length,
        keywordArrLen = keywordArr.length,
        i = 0,j = 0, start = 0;

        for (; i < keywordArrLen; i++) {
          j = start;
          for (; j < strArrLen; j++) {

            if(strArr[j] === keywordArr[i]) {
              if(ele) {
                strArr[j] = '<'+ele+'>' + strArr[j] + '</'+ele+'>';
              }

              start = ++j;
              break;
            }

          }
        }

        wrapStr = strArr.join("");

        return wrapStr;

    };
  }]);
