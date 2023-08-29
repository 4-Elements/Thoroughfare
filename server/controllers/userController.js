const mongoose = require('mongoose');
const User = require('../models/Usermodel.js');

const userController = {};

const createErr = error => {
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

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
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
        method: 'post',
        type: 'creating user',
        err,
      }),
    );
  }
};

module.exports = userController;
