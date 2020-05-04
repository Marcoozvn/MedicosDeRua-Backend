const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  papel: {
    type: String,
    enum: ['Academico', 'Medico', 'Juridico', 'Odontologia', 'Nutricao', 'Enfermagem', 'Veterinaria', 'Psicologia',
          'Fisioterapia', 'Admin', 'Tutor'],
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
  generateToken(id, nome, papel) {
    return jwt.sign({ id, nome, papel }, process.env.SECRET, {
      expiresIn: '7d',
    });
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
  },
};

module.exports = mongoose.model('User', UserSchema);