'use strict';

describe('Controller: TablesCtrl', function () {

  // load the controller's module
  beforeEach(module('databaseDictionaryBuildApp.controllers'));

  var TablesCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();

    $httpBackend = _$httpBackend_;
    $httpBackend
      .when('GET','/data/all_tables.json')
      .respond([{}, {}]);

    TablesCtrl = $controller('TablesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('测试 ngRes 返回', function () {
    // 调用完成
    $httpBackend.flush();
    expect(scope.list.length).toBe(2);
  });
});
