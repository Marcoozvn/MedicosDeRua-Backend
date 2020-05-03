const mongoose = require('mongoose');

const ActionSchema = mongoose.Schema({
  titulo: String,
  dataInicio: Date,
  dataFinal: Date
});

module.exports = mongoose.model('Action', ActionSchema);