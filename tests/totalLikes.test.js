const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  test('including negative equals 6', () => {
    const blogs = [
      { title: 'test', likes: 3 },
      { title: 'test2', likes: 4 },
      { title: 'test3', likes: -1 }
    ];
    expect(listHelper.totalLikes(blogs)).toBe(6);
  });
  test('of empty array equals zero', () => {
    const blogs = [];
    expect(listHelper.totalLikes(blogs)).toBe(0);
  });
  test('of one blog equals the likes of that blog', () => {
    const blogs = [{ title: 'test', likes: 3 }];
    expect(listHelper.totalLikes(blogs)).toBe(3);
  });
});

describe('favorite blog', () => {
  test('must return ...', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }
    ];
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('most likes', () => {
  test('must return ...', () => {
    const blogs = [
      {
        title: 'First',
        author: 'Jane',
        likes: 4,
        blogs: 3
      },
      {
        title: 'Second',
        author: 'Joe',
        likes: 1,
        blogs: 5
      },
      {
        title: 'Third',
        author: 'Jane',
        likes: 7,
        blogs: 1
      },
      {
        title: 'Fourth',
        author: 'Jack',
        likes: 1,
        blogs: 9
      },
      {
        title: 'Fifth',
        author: 'Joe',
        likes: 5,
        blogs: 12
      }
    ];
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Jane', likes: 11 });
  });
});
describe('most blogs', () => {
  test('must return ...', () => {
    const blogs = [
      {
        title: 'First',
        author: 'Jane',
        likes: 4,
        blogs: 3
      },
      {
        title: 'Second',
        author: 'Joe',
        likes: 1,
        blogs: 5
      },
      {
        title: 'Third',
        author: 'Jane',
        likes: 7,
        blogs: 1
      },
      {
        title: 'Fourth',
        author: 'Jack',
        likes: 1,
        blogs: 9
      },
      {
        title: 'Fifth',
        author: 'Joe',
        likes: 5,
        blogs: 12
      }
    ];
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Joe', blogs: 17 });
  });
});
