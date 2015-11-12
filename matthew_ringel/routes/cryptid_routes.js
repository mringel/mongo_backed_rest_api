var express = require('express');
var bodyParser = require('body-parser');
var Cryptid = require(__dirname + '/../models/cryptid');
var handleError = require(__dirname + '/../lib/handleServerError');
var cryptidMatch = require(__dirname + '/../lib/cryptidmatch');

var cryptoRouter = module.exports = exports = express.Router();

cryptoRouter.post('/cryptids', bodyParser.json(), function(req, res) {
  var newCryptid = new Cryptid(req.body);
  newCryptid.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

cryptoRouter.get('/cryptids', function(req, res) {
  Cryptid.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

// Toy.update({}, unsetOp, { runValidators: true }, function(err) {

cryptoRouter.put('/cryptids/:name', bodyParser.json(), function(req, res) {
  var cryptidData = req.body;
  Cryptid.update({name: req.params.name}, cryptidData, {runValidators: true}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Cryptid updated.'});
  });
});

cryptoRouter.delete('/cryptids/:name', function(req, res) {
  Cryptid.remove({name: req.params.name}, function(err) {
    if (err) return handleError(err, res);

    var msg = req.params.name + ' deleted from database';
    res.json({msg: msg});
  });
});

cryptoRouter.get('/cryptids/match/:name1/:name2',bodyParser.json(), function(req, res) {
  Cryptid.find({name: req.params.name1}, function(err, data1) {
    if (err) return handleError(err, res);
    // console.log(typeof data1);
    console.log(data1['0'].hobbies);
    // console.log(Object.keys(data1));
    if (Object.keys(data1).length > 1) {
      res.status(500).json({msg: 'more than one cryptid with name: ' +
        req.params.name1});
    }
    Cryptid.find({name: req.params.name2}, function(err, data2) {
      console.log(data2['0'].hobbies);
      // console.log(Object.keys(data1));
      if (!cryptidMatch(data1['0'], data2['0'])) return res.status(400)
        .json({msg: 'sorry, not a match'});
      data1['0'].partner = data2['0']._id;
      data1['0'].single = false;
      data2['0'].partner = data1['0']._id;
      data2['0'].single = false;
      Cryptid.update({name: data1['0'].name}, data1['0'], function(err) {
        if (err) return handleError(err, res);
        Cryptid.update({name: data2['0'].name}, data2['0'], function(err) {
          if (err) return handleError(err, res);
          res.json({msg: 'true love.  Cryptids updated.'})

        });
      });


    });

  });

});
