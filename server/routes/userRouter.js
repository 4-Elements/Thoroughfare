const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post(
  '/createUser',
  userController.hashPass,
  userController.createUser,
  (req, res) => {
    res.status(200).json({ message: 'User created successfully' });
  }
);

router.post(
  '/login',
  userController.hashPass,
  userController.authenticateUser,
  userController.generateToken,
  (req, res) => {
    res
      .status(200)
      .json({ message: 'Login successful', token: res.locals.token });
  }
);

router.get('/secret', userController.authorize, (req, res) => {
  res.status(200).send('Secret message: Eevee is best pokemon.');
});

module.exports = router;
