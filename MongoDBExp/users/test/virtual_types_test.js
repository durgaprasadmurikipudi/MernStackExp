const assert = require('assert');
const User = require('../src/user');

describe('Virtual type tests', () => {
  it('Post count is eqaul to number of posts', done => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'Posts title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'joe'}))
      .then(() => {
        assert(joe.posts.length === joe.postCount);
        done();
      });
  });
});