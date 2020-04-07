const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Academico', 'Medico', 'Juridico', 'Odontologia', 'Nutricao', 'Enfermagem', 'Veterinaria', 'Psicologia',
          'Fisioterapia', 'Admin', 'Tutor'],
  },
  tutorArea: {
    type: String
  }
});

UserSchema.pre('save', async function (next) {
  if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
  }
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },
};

UserSchema.statics = {
  generateToken(id, role, tutorArea) {
    return jwt.sign({ id, role, tutorArea }, 'secret', {
      expiresIn: '7d',
    });
  },
  verifyToken(token) {
    return jwt.verify(token, 'secret');
  },
};

module.exports = mongoose.model('User', UserSchema);