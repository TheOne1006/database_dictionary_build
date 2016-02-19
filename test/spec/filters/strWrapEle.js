'use strict';

describe('filter: str-wrap-ele', function () {
  // load the services's module
  beforeEach(module('databaseDictionaryBuildApp.filters'));

  var filterFun;

  beforeEach(inject(function($filter) {
    filterFun = $filter('strWrapEle');
  }));

  it('扩展标签',function() {
    expect(filterFun('abc','a', 'b')).toBe('<b>a</b>bc');
  });





});
