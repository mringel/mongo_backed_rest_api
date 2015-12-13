module.exports = function(app) {
  require('./controllers/cryptids_controller')(app);
  require('./directives/cryptid_form_directive')(app);
};
