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

afterAll(() => {
  mongoose.connection.close();
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
