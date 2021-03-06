const Action = require('../models/Action');
const moment = require('moment');

module.exports = {
  async create(req, res) {
    const { titulo, dataInicio, dataFinal } = req.body;

    try {
      const action = await Action.create({ titulo, dataInicio, dataFinal });

      return res.json(action);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  async findAll(req, res) {
    try {
      const dataAtual = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const actions = await Action.find({ dataFinal: {$gte: dataAtual}});

      return res.json(actions);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Action.remove({ _id: id });

      return res.json({ status: 'ok' })
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
}