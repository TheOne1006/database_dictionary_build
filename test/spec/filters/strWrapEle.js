'use strict';

describe('filter: str-wrap-ele', function () {
  // load the services's module
  beforeEach(module('databaseDictionaryBuildApp.filters'));

  var filterFun;

  beforeEach(inject(function(strWrapEle) {
    filterFun = strWrapEle;
  }));

  it('扩展标签',function() {
    console.log(filterFun);
    expect(filterFun('abc','a', 'b')).toBe('<b>a</b>bc');
  });





});
