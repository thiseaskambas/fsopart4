const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const helper = require('./helper');
const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  logger.info('DB cleaned');
});

describe('when users sign-up', () => {
  test('users are created and saved to DB', async () => {
    const newUser = { name: 'test test', username: 'test', password: 'test' };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
  test('users are returned from the DB', async () => {
    const users = await User.find({});
    expect(users[users.length - 1].name).toBe('test test');
  });
  test('users must have unique usernames', async () => {
    const newUser = { name: 'aaaa', username: 'test', password: 'test' };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
  test('users must have usernames of at least 3 chars', async () => {
    const newUser = { name: 'bbbb', username: 'A', password: 'test' };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
