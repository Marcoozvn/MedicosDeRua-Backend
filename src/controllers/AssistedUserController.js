const AssistedUser = require('../models/AssistedUser');

module.exports = {
  async find(req, res) {
    let query;

    if (req.query.nome) {
      query = { nome: { $regex: new RegExp(req.query.value, 'i') } }
    } else {
      query = req.query;
    }

    try {
      const users = await AssistedUser.find(query);
      
      res.json(users);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async extractUser(form) {
    const { paciente: { nome, cpf, dataNascimento }} = form;

      let user;

      if (cpf) {
        user = await AssistedUser.findOne({cpf});

      } else {
        user = await AssistedUser.findOne({nome});
      }

      if (!user) {
        user = await AssistedUser.create({nome, cpf, dataNascimento});
      } 

      return user;
  }
}