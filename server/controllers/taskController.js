const mongoose = require('mongoose');
const Lesson = require('../models/LessonModel.js');
const Task = require('../models/TaskModel.js');
const taskController = {};

const createErr = error => {
  const { method, type, err } = error;
  return {
    log: `taskController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in taskController.${method}. Check server logs for more details.`,
    },
  };
};

//Gets all tasks
taskController.allTasks = async (req, res, next) => {
  try {
    const allTasks = await Task.find({});
    next();
  } catch (err) {
    next(
      createErr({
        method: 'GET',
        type: 'getting all tasks',
        err,
      }),
    );
  }
};

//adds a new task

taskController.newTask = async (req, res, next) => {
  console.log('entered');
  const { taskName, taskPrompt, taskResource, taskQuestion, lessonId } =
    req.body;
  try {
    const newTask = new Task({
      taskName: taskName,
      taskPrompt: taskPrompt,
      taskResource: taskResource,
      taskQuestion: taskQuestion,
      lesson: lessonId,
    });
    const savedTask = await newTask.save();
    await Lesson.findByIdAndUpdate(lessonId, {
      $addToSet: { tasks: savedTask._id },
    });
    req.savedTask = savedTask;
    next();
  } catch (err) {
    console.log(err);
    next(
      createErr({
        method: 'POST',
        type: 'creating new task',
        err,
      }),
    );
  }
};

// Also need Add Task route set up and confirmed. That incoming object
// will need the Lesson._id, if it doesn’t already have it, and will get User._id from userController.authorize in the same way.

taskController.editTask = async (req, res, next) => {};

taskController.deleteTask = async (req, res, next) => {};

module.exports = taskController;
