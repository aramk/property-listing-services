const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

global.expect = chai.expect;
chai.use(chaiAsPromised);

const mongoose = require('mongoose');
mongoose.set('debug', true);

const config = require('../src/config');

// Clear database before starting tests. Use clearDB() manually where needed.
before(done => {
  global.clearDB = require('mocha-mongoose')(config.MONGO_URI, {noClear: true});
  clearDB(done);
});
