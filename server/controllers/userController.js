const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const Lesson = require('../models/LessonModel.js');
const Task = require('../models/TaskModel.js');
const PRIVATE_KEY = 'fC0mJaPOA9XHLkMkmt8j';

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

userController.getUser = async (req, res, next) => {
  if (res.locals.auth === false) return next();
  // Have User._id from authorization check
  // Fetch all user data and save
  const userId = req.userId;
  try {
    const response = await User.findOne({
      _id: userId,
    });
    console.log('userController.getUser queried for user:', response);
    res.locals.user = response;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'POST',
        type: 'Looking up user',
        err,
      }),
    );
  }
};

userController.getAuxUserData = async (req, res, next) => {
  if (res.locals.auth === false) return next();
  const { _id, userType, mentorCode, lessonsAccess, taskProgress } =
    res.locals.user;

  if (userType == 'mentor') {
    try {
      // Use [menteeIds] to grab mentee objs -> username, assigned, progress
      const menteeList = await User.find({
        mentorCode: mentorCode,
        userType: 'mentee',
      });
      const menteeData = menteeList.map(mentee => {
        return {
          username: mentee.username,
          lessonsAssigned: mentee.lessonsAssigned,
          taskProgress: mentee.taskProgress,
        };
      });
      console.log('mentee list', menteeData);
      //// Use [lessonsAccess] -> Get lesson titles
      const lessonListMentor = await Lesson.find({ mentorAccess: _id });
      const lessonDataMentor = lessonListMentor.map(lesson => {
        return {
          lessonNumber: lesson.lessonNumber,
          lessonName: lesson.lessonName,
          tasks: lesson.tasks,
        };
      });
      console.log('lesson list', lessonDataMentor);

      const userData = {
        mentorCode: mentorCode,
        menteeData: menteeData,
        lessonData: lessonDataMentor,
        userType: 'mentor',
      };
      res.locals.userData = userData;
      return next();
    } catch (err) {
      return next(
        createErr({
          method: 'getAuxUserData-mentor',
          type: 'Fetching extra mentor data.',
          err,
        }),
      );
    }
  } else if (userType == 'mentee') {
    try {
      // Use [lessonsAssigned] to grab lessons to grab tasks
      const lessonListMentee = await Lesson.find({
        _id: { $in: lessonsAccess },
      });
      const lessonDataMentee = lessonListMentee.map(lesson => {
        return {
          lessonNumber: lesson.lessonNumber,
          lessonName: lesson.lessonName,
          tasks: lesson.tasks,
        };
      });
      const taskIdsMentee = [];
      for (let i = 0; i < taskIdsMentee.length; i++) {
        taskIdsMentee.push(...lessonListMentee[i].tasks);
      }
      const taskListMentee = await Task.find({ _id: { $in: taskIdsMentee } });
      const taskObj = {};
      for (let i = 0; i < taskListMentee.length; i++) {
        taskObj[taskListMentee[i]._id] = {
          taskName: taskListMentee[i].taskName,
          taskPrompt: taskListMentee[i].taskPrompt,
          taskResource: taskListMentee[i].taskResource,
          taskQuestion: taskListMentee[i].taskQuestion,
        };
      }

      const userData = {
        lessonData: lessonDataMentee,
        taskData: taskObj,
        taskProgress: taskProgress,
        userType: 'mentee',
      };
      res.locals.userData = userData;
      return next();
    } catch (err) {
      return next(
        createErr({
          method: 'getAuxUserData-mentor',
          type: 'Fetching extra mentor data.',
          err,
        }),
      );
    }
  }
  return next('userType error');
};

userController.hashPass = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hashedPassword => {
      res.locals.hashedPassword = hashedPassword;
      return next();
    })
    .catch(e => {
      return next(
        createErr({
          method: 'hashPass',
          type: 'Hashing Password',
          err,
        }),
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
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'POST',
        type: 'creating user',
        err,
      }),
    );
  }
};

userController.authenticateUser = (req, res, next) => {
  const { username } = req.body;
  const password = res.locals.hashedPassword;

  User.findOne({
    username: username,
  })
    .then(user => {
      console.log('Found user while authenticating', user);
      res.locals.userId = user._id;
      bcrypt
        .compare(req.body.password, user.password)
        .then(passwordCheck => {
          if (!passwordCheck) {
            console.log('Failed password check');
            return res
              .status(400)
              .send({ message: 'Password does not match', error });
          } else return next();
        })
        .catch(err => {
          console.log('Incorrect password');
          return next(
            createErr({
              method: 'authenticateUser',
              type: 'Password does not match.',
              err,
            }),
          );
        });
    })
    .catch(err => {
      return next(
        createErr({
          method: 'authenticateUser',
          type: 'Authenticating User',
          err,
        }),
      );
    });
};

userController.generateToken = (req, res, next) => {
  const { username } = req.body;
  const token = jwt.sign(
    { userId: res.locals.userId, username: username },
    PRIVATE_KEY,
    { expiresIn: '24h' },
  );
  res.cookie('token', token, { maxAge: 900000 });
  // res.locals.token = token;
  return next();
};

userController.authorize = async (req, res, next) => {
  // // FAKE IT CODE
  //// FAKE MENTEE
  // req.userId = '64eed8dcf235f332d0b952e8';
  // req.username = 'user4';
  //  res.locals.auth = true;
  // return next();

  // // FAKE MENTOR
  req.userId = '64eed6fbc8b0998dfc2e8cc1';
  req.username = 'user1';
  res.locals.auth = true;
  return next();

  // REAL CODE
  if (req.cookies.token) {
    try {
      // const token = await req.headers.authorization.split(' ')[1];
      const token = req.cookies.token;
      const decodedToken = jwt.verify(token, PRIVATE_KEY);
      const authenticateUser = decodedToken;
      req.userId = authenticateUser.userId;
      req.username = authenticateUser.username;
      res.locals.auth = true;
      return next();
    } catch (err) {
      return next(
        createErr({
          method: 'Autorization',
          type: 'Authorizing User Session',
          err,
        }),
      );
    }
  } else {
    // No authorization
    res.locals.auth = false;
    console.log('No auth token detected. FE should send user to /login');
    return next();
  }
};

userController.deleteUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    const newUser = new User({
      username: username,
    });
    const deletedUser = await newUser.delete();
    return next();
  } catch (err) {
    return next(
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
