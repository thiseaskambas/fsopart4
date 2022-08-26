const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogModel');
const logger = require('../utils/logger');
const helper = require('./helper');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  logger.info('DB cleaned');
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
  logger.info('DB populated');
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all docs are returned', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length);
});

test('Id is defined', async () => {
  const res = await api.get('/api/blogs');
  console.log(res.body[0].id);
  expect(res.body[0].id).toBeDefined();
});

test('Blogs are saved to the DB', async () => {
  const newBlog = await Blog.create({
    title: 'Test',
    author: 'test test',
    url: 'test.test.com',
    likes: 15
  });
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(res.body[res.body.length - 1].title).toBe('Test');
});

test('Likes default to 0 if missing from the request', async () => {
  const newBlog = await Blog.create({
    title: 'Test',
    author: 'test test',
    url: 'test.test.com'
  });
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(res.body[res.body.length - 1].likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
