const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      res.json(req.body);
    } catch (err) {
      next(err);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  });
