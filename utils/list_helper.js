const _ = require('lodash');
const totalLikes = array => {
  return array.length === 0
    ? 0
    : array.reduce((prev, cur) => prev + cur.likes, 0);
};
const favoriteBlog = array => {
  return array.reduce((prev, cur) => (prev.likes > cur.likes ? prev : cur));
};
const mostLikes = array => {
  const merged = _.groupBy(array, 'author');
  const temp = [];
  for (const author in merged) {
    const sum = merged[author].reduce((prev, cur) => prev + cur.likes, 0);
    temp.push({ author, likes: sum });
  }
  return temp.reduce((prev, cur) => (prev.likes > cur.likes ? prev : cur));
};

const mostBlogs = array => {
  const merged = _.groupBy(array, 'author');
  const temp = [];
  for (const author in merged) {
    const sum = merged[author].reduce((prev, cur) => prev + cur.blogs, 0);
    temp.push({ author, blogs: sum });
  }
  return temp.reduce((prev, cur) => (prev.blogs > cur.blogs ? prev : cur));
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
