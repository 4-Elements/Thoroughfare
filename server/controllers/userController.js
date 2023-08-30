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

userController.getUser = async (req, res, next) => {
  try {
    const response = await User.findOne({
      username: username,
    });
    res.locals.allMessages = response;
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
  const { username, userType } = req.body;
  const password = res.locals.hashedPassword;

  const newUser = new User({
    username: username,
    password: password,
  });

  if (req.body.mentorCode && req.body.mentorCode.length) {
    newUser.userType = 'mentee';
    newUser.mentorCode = req.body.mentorCode;
  } else {
    newUser.userType = 'mentor';
    newUser.mentorCode = Date.now() % 100000;
  }
  try {
    if (newUser.userType === 'mentee') {
      newUserMentor = await User.find({
        mentorCode: newUser.mentorCode,
        userType: 'mentor',
      });
      if (newUserMentor.length === 0)
        return res.status(400).send({ message: 'Error: Invalid mentor code.' });
    }
    let savedUser = await newUser.save();
    res.locals.user = savedUser;
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
            return res
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

userController.deleteUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    const newUser = new User({
      username: username,
    });
    const deletedUser = await newUser.delete();
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

// ### User Accounts

// - Create New Mentor
//   - Store username, userType='mentor', menteeIds=[], lessonsAccess=[], activeChats=[]
//   - Hash and store password
//   - Generate and store mentorCode
// - Create new Mentee
//   - Store username, userType='mentee', mentor's mentorCode, lessonsAssigned=[], taskProgress=[], activeChats=[]
//   - Hash and store password
//   - Find Mentor's \_id by mentorCode and add Mentee's user.\_id to the Mentor's menteeIds
//   - Create new Chat between Mentor and Mentee, add the Chat.\_id to both users' activeChats
