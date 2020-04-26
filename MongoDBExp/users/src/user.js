const mongoose = require('mongoose');
const PostSchema = require('./posts');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      message: 'The Name should have minimum length of 2.',
      validator: name => name.length > 2
    }
  },
  postCount: Number,
  posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;