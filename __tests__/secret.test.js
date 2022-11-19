const pool = require('../lib/utils/pool');
const setup = require('../data/setup');

const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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

  const user = await UserService.create({ ...mockUser, ...userProps });
  console.log('userrrrr', user);
  //use user to sign in

  const { email } = user;
  const signIn = await agent
    .post('/api/v1/users/sessions')
    .send({ email, password });
  console.log(signIn.body);
  return [agent, user];
};

describe('secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('unauthenticated in user is unable to view secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');

    expect(res.body).toEqual({
      message: 'You must be signed in to continue',
      status: 401,
    });
  });
  it('authenticated user can view list of secrets', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/secrets');
    expect(res.status).toBe(200);
  });
  it('logged in users can create new secrets', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/secrets').send({
      title: 'Flat Earth',
      description: 'CAN YOU SEE A CURVE BRO!?',
    });
    expect(res.body).toHaveProperty('title', 'Flat Earth');
  });
  afterAll(() => {
    pool.end();
  });
});
