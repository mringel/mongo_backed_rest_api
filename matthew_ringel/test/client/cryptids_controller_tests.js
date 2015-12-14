require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('cryptids controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('CryptidMatchApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('CryptidsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.cryptids)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('CryptidsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to cryptids with a GET all', function() {
      $httpBackend.expectGET('/api/cryptids').respond(200, [{_id: 1, name: 'test sasquatch'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.cryptids[0].name).toBe('test sasquatch');
    });

    it('should be able to create a new cryptid', function() {
      $httpBackend.expectPOST('/api/cryptids', {name: 'test sasquatch',
        habitat: 'forest',
        rabid: false,
        single: true,
        partner: null,
        vegetarian: true}).respond(200, {name: 'a different sasquatch'});
      expect($scope.cryptids.length).toBe(0);
      expect($scope.newCryptid).toEqual($scope.defaults);
      $scope.newCryptid.name = 'test sasquatch';
      $scope.create($scope.newCryptid);
      $httpBackend.flush();
      expect($scope.cryptids[0].name).toBe('a different sasquatch');
      expect($scope.newCryptid).toEqual($scope.defaults);
    });

    it('should be able to delete a cryptid', function() {
      $scope.cryptids = [{_id: 0, name: 'sasquatch'}, {_id: 1, name: 'yeti'}, {_id: 2, name: 'abominable snowman'}];
      $httpBackend.expectDELETE('/api/cryptids/1')
        .respond(200, {msg: 'yeti deleted from database'});
      expect($scope.cryptids.length).toBe(3);
      $scope.remove($scope.cryptids[1]);
      $httpBackend.flush();
      expect($scope.cryptids.length).toBe(2);
    });
  });

});
