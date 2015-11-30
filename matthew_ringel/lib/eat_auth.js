var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token || (req.body)? req.body.token : '';
  if (!token) {
    console.log('no token');
    return res.status(401).json({msg: 'authentication failed'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'authentication failed'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authentication failed'});
      }

      if(!user) {
        console.log(err);
        return res.status(401).json({msg: 'authentication failed'});

      }

      req.user = user;
      next();
    });

  });
};
