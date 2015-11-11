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

cryptoRouter.put('/cryptids/:id',bodyParser.json(), function(req, res) {
  var cryptidData = req.body;
  delete cryptidData._id;
  Cryptid.update({id: req.params.id}, cryptidData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Cryptid updated.'});
  });
});
