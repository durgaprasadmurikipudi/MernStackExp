const assert = require('assert');
const User = require('../src/user');

describe('Sub documents tests', () => {
  it('can create and save a sub document', done => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'Sample post title'}]
    });
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then(user => {
        assert(user.posts[0].title === 'Sample post title');
        done();
    });
  });

  it('can update and save a sub document', done => {
    const joe = new User({
      name: 'joe',
      posts: []
    });
    
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then(user => {
        user.posts.push({ title: 'New Title'});
        return user.save();
      })
      .then(user => {
        assert(user.posts[0].title === 'New Title');
        done();
      });
  });

  it('can remove a sub document', done => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'Post title'}]
    });
    
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});