const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const PRIVATE_KEY = 'fC0mJaPOA9XHLkMkmt8j';

const userController = {};

const createErr = (error) => {
  const { method, type, err } = error;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

userController.hashPass = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      res.locals.hashedPassword = hashedPassword;
      next();
    })
    .catch((e) => {
      next(
        createErr({
          method: 'hashPass',
          type: 'Hashing Password',
          err,
        })
      );
    });
};

userController.createUser = async (req, res, next) => {
  const { username } = req.body;
  const password = res.locals.hashedPassword;

  try {
    const newUser = new User({
      username: username,
      password: password,
    });
    const savedUser = await newUser.save();
    next();
  } catch (err) {
    next(
      createErr({
        method: 'POST',
        type: 'creating user',
        err,
      })
    );
  }
};

userController.authenticateUser = (req, res, next) => {
  const { username } = req.body;
  const password = res.locals.hashedPassword;

  User.findOne({
    username: username,
  })
    .then((user) => {
      res.locals.userId = user._id;
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response
              .status(400)
              .send({ message: 'Password does not match', error });
          } else next();
        })
        .catch((err) => {
          console.log('Incorrect password');
          next(
            createErr({
              method: 'authenticateUser',
              type: 'Password does not match.',
              err,
            })
          );
        });
    })
    .catch((err) => {
      next(
        createErr({
          method: 'authenticateUser',
          type: 'Authenticating User',
          err,
        })
      );
    });
};

userController.generateToken = (req, res, next) => {
  const { username } = req.body;
  const token = jwt.sign(
    { userId: res.locals.userId, username: username },
    PRIVATE_KEY,
    { expiresIn: '24h' }
  );
  res.locals.token = token;
  next();
};

userController.authorize = async (req, res, next) => {
  const { username } = req.body;
  try {
    const token = await req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, PRIVATE_KEY);
    const authenticateUser = await decodedToken;
    req.userId = authenticateUser.userId;
    req.username = authenticateUser.username;
    next();
  } catch (err) {
    next(
      createErr({
        method: 'Autorization',
        type: 'Authorizing User Session',
        err,
      })
    );
  }
};

module.exports = userController;
