var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/cryptids_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Cryptid = require(__dirname + '/../models/cryptid');


describe('cryptid routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a sasquatch', function(done) {
    var cryptidData = {name: 'test sasquatch'};
    chai.request('localhost:3000')
      .post('/api/cryptids')
      .send(cryptidData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test sasquatch');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('rabid');
        done();
      });
  });

  it('should be able to list all sasquatches', function(done) {
    chai.request('localhost:3000')
      .get('/api/cryptids')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('routes that need a sasquatch in the db', function(done) {
    beforeEach(function(done) {
      (new Cryptid({name: 'test sasquatch'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.cryptid = data;
          done();
      }.bind(this));
    });

    it('should be able to modify a sasquatch dating profile', function(done) {
      chai.request('localhost:3000')
        .put('/api/cryptids/' + this.cryptid.name)
        .send({single: false})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Cryptid updated.');
          done();
        });
    });

    it('should be able to delete a sasquatch dating profile', function(done) {
      chai.request('localhost:3000')
        .delete('/api/cryptids/' + this.cryptid.name)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('test sasquatch deleted from database');
          done();
        });
    });

  }); // end of describe for routes that need a bear to exist.


}); // end of describe cryptid routes
