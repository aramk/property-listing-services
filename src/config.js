const environment = require('envobj');

module.exports = environment({
  MONGO_URI: 'mongodb://localhost/property-listing',
  ZOOPLA_API_KEY: 'key',
  ZOOPLA_API_HOST: 'http://localhost:3001'
});
