require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//const audit = require('./config/logger');

const routes = require('./routes');
require('./config/database');

const app = express();

app.use(cors({
  exposedHeaders: 'X-Total-Count'
}));
//app.use(audit);
app.use(helmet());
app.use(express.json());
app.use(routes);

module.exports = app;