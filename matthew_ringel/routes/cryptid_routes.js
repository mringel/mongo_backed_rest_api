var express = require('express');
var bodyParser = require('body-parser');
var Cryptid = require(__dirname + '/../models/cryptid');
var handleError = require(__dirname + '/../lib/handleServerError');

var bearsRouter = module.exports = exports = express.Router();
