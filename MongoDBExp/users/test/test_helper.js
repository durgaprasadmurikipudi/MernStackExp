const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost:27017/users_test', { useNewUrlParser: true });
  mongoose.connection.once('open', () => done()).on('error', error => console.log(error));
});

beforeEach(done => {
  // Although we named the model blogPost, it is normalized in mongodb
  const { users, comments, blogposts } = mongoose.connection.collections;

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});