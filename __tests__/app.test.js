const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// create a mockuser to test
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  //create an agent that gives the ability to store cookies between requests in a test

  const agent = request.agent(app);

  //create a user to sign in with

  const user = await UserService.create({ ...mockUser, userProps });

  //use user to sign in

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('top-secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a new user', async () => {
    const resp = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(resp.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
