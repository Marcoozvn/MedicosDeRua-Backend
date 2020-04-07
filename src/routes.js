const { Router } = require('express');

const SessionController = require('./controllers/SessionController');
const FormController = require('./controllers/FormController');
const AssistedUserController = require('./controllers/AssistedUserController');
//const AnamneseController = require('./controllers/AnamneseController');
//const ReturnController = require('./controllers/ReturnController');

const routes = Router();

//Login - Registro de usuários
routes.post('/register', SessionController.verifyToken, SessionController.register);
routes.post('/login', SessionController.login);
routes.post('/admin', SessionController.find);

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