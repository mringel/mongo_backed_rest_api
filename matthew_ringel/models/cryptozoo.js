var mongoose = require('mongoose');

var cryptoSchema = new mongoose.Schema({
  name: String,
  species: String,
  habitat: {type: String, default: 'forest'},
  rabid: {type: Boolean, default: false},
  vegetarian: {type: Boolean, default: true}
});

module.exports = mongoose.model('cryptid', cryptoSchema);
