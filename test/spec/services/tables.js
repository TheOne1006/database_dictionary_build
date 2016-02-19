'use strict';

describe('Service: TablesService', function () {

  // load the services's module
  beforeEach(module('databaseDictionaryBuildApp.services'));

  var mockServer;

  beforeEach(inject(function (TablesService) {
    mockServer = TablesService;
  }));

  it('测试获取数据长度', function () {
    expect(mockServer.gets().length).toBe(2);
    // expect(mockServer.get().length).toBe(3);
  });
});
