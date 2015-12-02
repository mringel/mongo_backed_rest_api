var mongoose = require('mongoose');
var express = require('express');
var app = express();
var cryptoRouter = require(__dirname + '/routes/cryptid_routes');
var authRouer = require(__dirname + '/routes/auth_routes');
var fs = require('fs');
process.env.APP_SECRET = process.env.APP_SECRET || 'changethisinproduction';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/cryptozoo');

app.use(express.static(__dirname + '/build'));

app.use('/api', cryptoRouter);
app.use('/api', authRouer);

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
