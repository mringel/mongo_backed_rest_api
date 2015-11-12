var mongoose = require('mongoose');
var express = require('express');
var app = express();
var cryptoRouter = require(__dirname + '/routes/cryptid_routes');

mongoose.connect('mongodb://localhost/cryptozoo');

app.use('/api', cryptoRouter);

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
