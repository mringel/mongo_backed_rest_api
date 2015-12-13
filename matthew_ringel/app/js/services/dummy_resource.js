module.exports = function(app) {
  app.service('dummyResource', function() {
    this.findRabid = function(cryptid) {
      return cryptid.rabid;
    };
  });
};
