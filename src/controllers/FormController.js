const Anamnese = require('../models/AnamneseForm');
const Return = require('../models/ReturnForm');
const AssistedUserController = require('./AssistedUserController');

module.exports = {
  async createAnamnese(req, res) {
    try {
      const user = await AssistedUserController.extractUser(req.body);

      const anamnese = await Anamnese.create({
        ...req.body,
        paciente: user,
        type: 'Anamnese inicial'
      });

      res.json(anamnese);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  },

  async updateAnamnese(req, res) {
    const { id } = req.params;

    try {
      const form = await Anamnese.findById(id);

      const userId = form.paciente;

      AssistedUserController.updateUser(userId, req.body.paciente)

      const anamnese = {
        ...req.body,
        paciente: userId,
      };

      await Anamnese.findOneAndUpdate({ _id: id }, anamnese);

      res.json({ message: 'Ok' });

    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  },

  async deleteAnamnese(req, res) {
    const { id } = req.params;

    try {
      const anamnese = await Anamnese.findOne({ _id: id });
      await Anamnese.remove(anamnese);

      AssistedUserController.checkUser(anamnese.paciente);

      res.json({ message: 'Ok' });
      
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async createReturn(req, res) {
    try {
      const user = await AssistedUserController.extractUser(req.body);

      const returnForm = await Return.create({
        ...req.body,
        paciente: user,
        type: 'Retorno'
      });

      res.json(returnForm);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  },

  async updateReturn(req, res) {
    const { id } = req.params;

    try {
      const form = await Anamnese.findById(id);

      const userId = form.paciente;
      
      const returnForm = {
        ...req.body,
        paciente: userId
      };

      await Return.findOneAndUpdate({ _id: id }, returnForm);

      res.json({ message: 'Ok' });

    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  },

  async deleteReturn(req, res) {
    const { id } = req.params;

    try {
      const form = await Return.findOne({ _id: id });
      await Return.remove(form);

      AssistedUserController.checkUser(form.paciente);

      res.json({ message: 'Ok' });
      
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async find(req, res) {
    const { assistedUserId } = req.params;

    try {
      const anamneses = await Anamnese.find({ paciente: { _id: assistedUserId } }).populate('paciente');
      const returns = await Return.find({ paciente: { _id: assistedUserId } }).populate('paciente');

      const result = [...anamneses, ...returns];

      res.json(result);
      
    } catch (error) {
      res.status(500).send({ message: error })
    }
  }
}