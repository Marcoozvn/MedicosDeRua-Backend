const mongoose = require('mongoose');

const AnamneseSchema = mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssistedUser',
    required: true
  } 
}, { strict: false });

module.exports = mongoose.model('Anamnese', AnamneseSchema);