var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleServerError');
var basicHttp = require(__dirname + '/../lib/basic_http_authentication');
var User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, data) {
    if (err && (err.code === 11000 || err.code === 11001)) {
      console.log(err);
      return res.status(400).json({msg: 'username already exists'});
    }
    if (err) return handleError(err, res);
    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if(!(req.auth.username && req.auth.password)) {
    console.log('no basic authorization provided');
    return res.status(401).json({msg: 'bad username and/or password'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('Could not find user');
      return res.status(401).json({msg: 'user not found'});
    }

    if (!user) {
      console.log('Could not find user');
      return res.status(401).json({msg: 'user not found'});
    }

    if (!user.checkPassword(req.auth.password)) {
      console.log('bad password');
      return res.status(401).json({msg: 'bad password'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});
