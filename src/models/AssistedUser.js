const mongoose = require('mongoose');

const AssistedUserSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String
  },
  dataNascimento: {
    type: String
  },
  idade: {
    type: Number
  }
});

module.exports = mongoose.model('AssistedUser', AssistedUserSchema);