const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'joe', postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('update a record by set n save', done => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);      
  });

  it('updates a record by model instance update', done => {
    assertName(joe.update({ name: 'Alex'}), done);
  });

  it('updates a record by model class update', done => {
    assertName(User.update({ name: 'joe'}, { name: 'Alex' }), done);
  });

  it('updates a record by model class findOneAndUpdate', done => {
    assertName(User.findOneAndUpdate({ name: 'joe'}, { name: 'Alex' }), done);
  });

  it('updates a record by model class findByIdAndUpdate', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex'}), done);
  });

  it('A user can have their postcount updated by 1', done => {
    User.update({ name: 'joe'}, { $inc: { postCount: 1 }})
      .then(() => User.findOne({ name: 'joe'}))
      .then(user => {
        assert(user.postCount === 1);
        done();
      })
      .catch(err => {
        throw err;
      });
  });

});