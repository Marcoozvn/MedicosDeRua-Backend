const mongoose = require('mongoose');

const ReturnSchema = mongoose.Schema({
  data: Date,
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssistedUser',
    required: true
  }
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Return', ReturnSchema);