const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('middleware tests', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'joe'});
    blogPost = new BlogPost({ title: 'JS is great!', content: 'Yep it reall is!' });
    joe.blogPosts.push(blogPost);
    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('When user is removd, dangling blogposts are removed', done => {
    joe.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });

});