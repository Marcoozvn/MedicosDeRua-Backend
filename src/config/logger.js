const audit = require('express-requests-logger')
const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'MedicosDeRua-backend', 
    stream: process.stdout
});

module.exports = audit({
  logger: log, // Existing bunyan logger
  excludeURLs: ['login'], // Exclude paths which enclude 'health' & 'metrics'
  request: {
      maskBody: ['password'], // Mask 'password' field in incoming requests
      excludeHeaders: ['authorization'], // Exclude 'authorization' header from requests
  },
  response: {
      maskBody: ['token', 'password'], // Mask 'session_token' field in response body
      excludeHeaders: ['*'], // Exclude all headers from responses,
  }
});