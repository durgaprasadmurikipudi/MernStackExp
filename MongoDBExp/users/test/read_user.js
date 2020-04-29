const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
  let joe, maria, alex, zach;

  beforeEach(done => {
    joe = new User({ name: 'joe'});
    maria = new User({ name: 'maria'});
    alex = new User({ name: 'alex'});
    zach = new User({ name: 'zach'});
    
    Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
      .then(() => done())
    
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

  it('the user query skip and limit works!', done => {
    User.find({}).skip(1).limit(2).sort({ name: 1})
    .then(users => {
      assert(users.length === 2);
      assert(users[0].name === 'joe');
      assert(users[1].name === 'maria');
      done();
    });    
  });

});