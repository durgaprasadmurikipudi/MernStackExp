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
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: mongoose.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  
  BlogPost.remove({ _id: { $in: this.blogPosts }})
    .then(() => next())
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;