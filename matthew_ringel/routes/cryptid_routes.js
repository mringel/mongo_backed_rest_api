var express = require('express');
var bodyParser = require('body-parser');
var Cryptid = require(__dirname + '/../models/cryptid');
var handleError = require(__dirname + '/../lib/handleServerError');

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

cryptoRouter.put('/cryptids/:name', bodyParser.json(), function(req, res) {
  var cryptidData = req.body;
  // delete cryptidData.name;
  Cryptid.update({name: req.params.name}, cryptidData, function(err) {
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
