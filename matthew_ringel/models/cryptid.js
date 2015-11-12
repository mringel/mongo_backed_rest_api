var mongoose = require('mongoose');

var cryptidSchema = new mongoose.Schema({
  name: String,
  species: String,
  habitat: {type: String, default: 'forest'},
  rabid: {type: Boolean, default: false},
  vegetarian: {type: Boolean, default: true},
  single: {type: Boolean, default: true},
  partner: {type: String, default: null},
  hobbies: Array
});

module.exports = mongoose.model('cryptid', cryptidSchema);
