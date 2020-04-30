const AssistedUser = require('../models/AssistedUser');
const ReturnForm = require('../models/ReturnForm');
const AnamneseForm = require('../models/AnamneseForm');

module.exports = {
  async find(req, res) {
    let query;

    if (req.query.nome) {
      query = { nome: { $regex: new RegExp(req.query.nome, 'i') } }
    } 
    if (req.query.dataNascimento) {
      const dd = req.query.dataNascimento.substring(0, 2);
      const mm = +req.query.dataNascimento.substring(2, 4) - 1; //o mês é contado a partir do 0
      const yyyy = req.query.dataNascimento.substring(4);
      query = { dataNascimento:  new Date(yyyy, mm, dd).toISOString()};
    }
    else {
      query = req.query;
    }

    try {
      const users = await AssistedUser.find(query);

      res.json(users);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async checkUser(id) {
    const anamneses = await AnamneseForm.find({ paciente: id });
    const returns = await ReturnForm.find({ paciente: id });
    
    const result = [...anamneses, ...returns];

    if (result.length == 0) {
      await AssistedUser.remove({ _id: id });
    }
  },

  async extractUser(form) {
    const { paciente } = form;

    const { nome, cpf, dataNascimento } = paciente;

    let user;

    if (cpf) {
      user = await AssistedUser.findOne({ cpf });

    } else {
      user = await AssistedUser.findOne({ nome, dataNascimento });
    }

    if (!user) {
      user = await AssistedUser.create(paciente,);
    } else {
      delete paciente._id;
      await AssistedUser.findOneAndUpdate({_id: user.id}, { ...paciente })
    }


    return user;
  }
}