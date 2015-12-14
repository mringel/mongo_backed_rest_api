describe('dummyResource service', function() {

  var dummyResource;

  beforeEach(angular.mock.module('CryptidMatchApp'));
  beforeEach(angular.mock.inject(function(_dummyResource_) {
    dummyResource = _dummyResource_;
  }));

  it('should return the rabid state of a cryptid', function() {
    var testCryptid = {rabid: true};
    expect(dummyResource.findRabid(testCryptid)).toBe(true);
  });
});
