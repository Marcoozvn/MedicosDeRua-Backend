const User = require('../models/User');

module.exports = {
  async register(req, res) {
    try {

      const user = await User.create(req.body);
      
      res.json({ ...user._doc, password: null });
    
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({message: 'Login/senha incorretos!'});
    }

    const match = await user.compareHash(password);

    if (!match) {
      return res.status(400).send({message: 'Login/senha incorretos!'});
    }

    const token = User.generateToken(user._id, user.role, user.tutorArea);
    
    return res.json({token});
  },

  verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send({error: "Token não fornecido."});

    try {
      const decoded = User.verifyToken(token.split(' ')[1]);
      
      req.userId = decoded.id;
      req.role = decoded.role;
      req.tutorArea = decoded.tutorArea;

      next();
      
    } catch (error) {
      return res.status(403).send({error: 'Falha ao autenticar token.'});
    }
  }
  
}