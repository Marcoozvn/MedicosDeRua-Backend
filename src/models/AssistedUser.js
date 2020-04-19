const mongoose = require('mongoose');

const AssistedUserSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: String,
  dataNascimento: String,
  idade: Number,
  religiao: String,
  etnia: String,
  sexo: String,
  situacaoConjugal: String,
  escolaridade: String,
  cidade: String,
  ultimaCidade: String,
  temDocsPessoais: String,
  orientacao: String,
  contato: String,
  documentosPessoais: Object
});

module.exports = mongoose.model('AssistedUser', AssistedUserSchema);