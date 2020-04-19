const mongoose = require('mongoose');

const AnamneseSchema = mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssistedUser',
    required: true
  } 
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Anamnese', AnamneseSchema);