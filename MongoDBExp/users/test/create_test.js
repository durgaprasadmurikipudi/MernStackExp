const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('Save a user', done => {
    const joe = new User({ name: 'joe'});
    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});