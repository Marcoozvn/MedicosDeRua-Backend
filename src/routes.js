const { Router } = require('express');

const SessionController = require('./controllers/SessionController');
const FormController = require('./controllers/FormController');
const AssistedUserController = require('./controllers/AssistedUserController');
const ActionController = require('./controllers/ActionController');
//const AnamneseController = require('./controllers/AnamneseController');
//const ReturnController = require('./controllers/ReturnController');

const routes = Router();

//Login - Registro de usuários
routes.post('/register', SessionController.verifyToken, SessionController.verifyRole, SessionController.register);
routes.post('/login', SessionController.login);

//Ações
routes.post('/action', SessionController.verifyToken, SessionController.verifyRole, ActionController.create);
routes.get('/action', SessionController.verifyToken, SessionController.verifyRole, ActionController.findAll);
routes.delete('/action/:id', SessionController.verifyToken, SessionController.verifyRole, ActionController.delete);

//Usuários assistidos
routes.get('/users', SessionController.verifyToken, AssistedUserController.find);

//Formulários
routes.get('/form/:assistedUserId', SessionController.verifyToken, FormController.find);

//Fichas de Anamnese
routes.post('/form/anamnese', SessionController.verifyToken, FormController.createAnamnese);
routes.put('/form/anamnese/:id', SessionController.verifyToken, FormController.updateAnamnese);
routes.delete('/form/anamnese/:id', SessionController.verifyToken, FormController.deleteAnamnese);

//Fichas de Retorno
routes.post('/form/return', SessionController.verifyToken, FormController.createReturn);
routes.put('/form/return/:id', SessionController.verifyToken, FormController.updateReturn);
routes.delete('/form/return/:id', SessionController.verifyToken, FormController.deleteReturn);

module.exports = routes;