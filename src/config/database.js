const mongoose = require('mongoose');

const config = process.env.NODE_ENV == 'dev' ? process.env.DB_DEV_HOST : process.env.DB_TEST_HOST; 

mongoose.connect(config, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;