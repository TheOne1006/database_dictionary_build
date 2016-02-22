'use strict';

/**
 * @ngdoc function
 * @name ui.flat.directive:fui-search-group
 * @description
 * # FuiSearchGroup
 * directive of the ui.flat
 * 使用方式
 * <fui-search-group model="keyWorld">
 */
angular
  .module('ui.flat')
  .directive('fuiSearchGroup', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<div class="form-group" >'+
                    '<div class="input-group" ng-class={"focus":focus}>'+
                      '<input class="form-control" type="search" placeholder="表名" ng-focus="handleFocus()" ng-blur="handleBlur()" ng-model="model" ng-model-options="{ debounce: 500 }">'+
                        '<span class="input-group-btn">'+
                          '<button type="submit" class="btn"><span class="fui-search"></span></button>'+
                        '</span>'+
                    '</div>'+
                  '</div>',
        scope:{
           model:'='
        },
        link: function(scope, element, attrs) {
          scope.focus = false;
          scope.handleFocus = function () {
            scope.focus = true;
          };
          scope.handleBlur = function () {
            scope.focus = false;
          };
        }

    };
  });
