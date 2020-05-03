const { Router } = require('express');

const SessionController = require('./controllers/SessionController');
const FormController = require('./controllers/FormController');
const AssistedUserController = require('./controllers/AssistedUserController');
const ActionController = require('./controllers/ActionController');

const routes = Router();

//Login - Registro de usuários
routes.post('/register', SessionController.verifyToken, SessionController.verifyRole, SessionController.verifyAction, SessionController.register);
routes.post('/login', SessionController.login);

//Ações
routes.post('/action', SessionController.verifyToken, SessionController.verifyRole, SessionController.verifyAction, ActionController.create);
routes.get('/action', SessionController.verifyToken, SessionController.verifyRole, SessionController.verifyAction, ActionController.findAll);
routes.delete('/action/:id', SessionController.verifyToken, SessionController.verifyRole, SessionController.verifyAction, ActionController.delete);

//Usuários assistidos
routes.get('/users', SessionController.verifyToken, SessionController.verifyAction, AssistedUserController.find);

//Formulários
routes.get('/form/:assistedUserId', SessionController.verifyToken, SessionController.verifyAction, FormController.find);

//Fichas de Anamnese
routes.post('/form/anamnese', SessionController.verifyToken, SessionController.verifyAction, FormController.createAnamnese);
routes.put('/form/anamnese/:id', SessionController.verifyToken, SessionController.verifyAction, FormController.updateAnamnese);
routes.delete('/form/anamnese/:id', SessionController.verifyToken, SessionController.verifyAction, FormController.deleteAnamnese);

//Fichas de Retorno
routes.post('/form/return', SessionController.verifyToken, SessionController.verifyAction, FormController.createReturn);
routes.put('/form/return/:id', SessionController.verifyToken, SessionController.verifyAction, FormController.updateReturn);
routes.delete('/form/return/:id', SessionController.verifyToken, SessionController.verifyAction, FormController.deleteReturn);

module.exports = routes;