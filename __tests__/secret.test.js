const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');
// const { agent } = require('supertest');

describe('secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('a signed in user can view list of secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');

    expect(res.body).toEqual({
      message: 'You must be signed in to continue',
      status: 401,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
