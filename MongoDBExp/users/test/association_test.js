const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const assert = require('assert');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'joe'});
    blogPost = new BlogPost({ title: 'JS is great!', content: 'Yep it reall is!' });
    comment = new Comment({ content: 'Congrats on a great comment!'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
  });

  it('saves a relation between a user and a blog post', done => {
    User.findOne({ name: 'joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is great!');
        done();
      });
  });

  it('saves a full relation graph', done => {
    User.findOne({ name: 'joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'joe');
        assert(user.blogPosts[0].title === 'JS is great!');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on a great comment!');
        assert(user.blogPosts[0].comments[0].user.name === 'joe');
        
        done();
      })
  });

});