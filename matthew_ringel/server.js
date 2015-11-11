var mongoose = require('mongoose');
var express = require('express');
var app = express();
var cryptoRouter = require(__dirname + '/routes/cryptid_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/cryptozoo');

app.use('/api', cryptoRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
