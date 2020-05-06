const audit = require('express-requests-logger')
const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'MedicosDeRua-backend', 
    streams: [{
      type: 'rotating-file',
      path: process.cwd() + '\\MedicosDeRua.log' ,
      period: '1d',   // daily rotation
      count: 3        // keep 3 back copies
  }]
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