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
  const newBlog = {
    title: 'Test',
    author: 'test test',
    url: 'test.test.com',
    likes: 15
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(res.body[res.body.length - 1].title).toBe('Test');
});

test('Likes default to 0 if missing from the request', async () => {
  const newBlog = {
    title: 'Test',
    author: 'test test',
    url: 'test.test.com'
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(res.body[res.body.length - 1].likes).toBe(0);
});

test('Blogs cannot be created if missing title or url', async () => {
  const newBlog = {
    likes: 12,
    author: 'test test'
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length);
});

test('find by id and delete', async () => {
  const blogs = await Blog.find({});
  const index = Math.floor(Math.random() * blogs.length);
  const id = blogs[index].id;
  console.log({ id });
  await api.delete(`/api/blogs/${id}`).expect(204);
  const endBlogs = await Blog.find({});
  const ids = endBlogs.map(blog => blog.id);
  expect(ids).not.toContain(id);
});

test('find by id and update likes', async () => {
  const blogs = await Blog.find({});
  const index = Math.floor(Math.random() * blogs.length);
  const id = blogs[index].id;
  const randomLikes = Math.floor(Math.random() * 9999);
  const res = await api
    .put(`/api/blogs/${id}`)
    .send({ likes: randomLikes })
    .expect(200);

  expect(res.body.likes).toEqual(randomLikes);
});

afterAll(() => {
  mongoose.connection.close();
});
