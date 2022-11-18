const { Router } = require('express');

const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const sessionToken = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in succesfully' });
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })
  .delete('/sessions', async (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .status(204)
      .send();
  });
