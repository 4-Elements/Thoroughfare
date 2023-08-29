const mongoose = require('mongoose');
const User = require('../models/Usermodel.js');

const userController = {};

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
      }),
    );
  }
};

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
        method: 'POST',
        type: 'creating user',
        err,
      }),
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
      }),
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
