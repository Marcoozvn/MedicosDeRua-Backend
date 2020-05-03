const User = require('../models/User');
const Action = require('../models/Action');
const moment = require('moment');

module.exports = {
  async find(req, res) {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async register(req, res) {
    try {

      const { login } = req.body;

      let user = await User.findOne({ login });

      if (user) {
        return res.status(400).send({ message: 'Usuário já existe' });
      }

      user = await User.create(req.body);

      res.json({ ...user._doc, password: null });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async login(req, res) {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(400).send({message: 'Login/senha incorretos!'});
    }

    const match = await user.compareHash(password);

    if (!match) {
      return res.status(400).send({message: 'Login/senha incorretos!'});
    }

    if (user.papel !== 'Tutor') {
      const dataAtual = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const action = await Action.find({ dataInicio: {$lte: dataAtual}, dataFinal: {$gte: dataAtual}});

      if (!action || action.length == 0) {
        return res.status(403).send({message: 'Não é permitido acessar o sistema no período atual'});
      }
    }

    const token = User.generateToken(user._id, user.papel);
    
    return res.json({token});
  },

  verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send({message: "Token não fornecido."});

    try {
      const decoded = User.verifyToken(token.split(' ')[1]);
      
      req.userId = decoded.id;
      req.papel = decoded.papel;

      next();
      
    } catch (error) {
      console.log(error);
      return res.status(403).send({message: 'Falha ao autenticar token.'});
    }
  },

  verifyRole(req, res, next) {
    const papel = req.papel;

    if (papel === 'Tutor') {
      next();
    } else {
      return res.status(403).send({message: 'Não autorizado'});
    }
  },

  async verifyAction(req, res, next) {
    const papel = req.papel;

    if (papel === 'Tutor') {
      next();
    } else {
      const dataAtual = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const action = await Action.find({ dataInicio: {$lte: dataAtual}, dataFinal: {$gte: dataAtual}});

      if (action.length > 0) {
        next();
      }

      else {
        return res.status(403).send({message: 'Não é permitido acessar o sistema no período atual'});
      }
    }
  }
  
}