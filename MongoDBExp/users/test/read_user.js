const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'joe'});
    joe.save().then(() => done());
  });

  it('reads user from database', done => {
    User.find({ name: 'joe'}).then(data => {
      assert(data[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('reads user from database', done => {
    User.findOne({ name: 'joe'}).then(user => {
      assert(user._id.toString() === joe._id.toString());
      done();
    });
  });

});