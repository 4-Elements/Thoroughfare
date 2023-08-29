const mongoose = require('mongoose');
const Task = require('../routes/taskRouter');

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
lessonController.allTasks = async (req, res, next) => {
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

lessonController.newTask = async (req, res, next) => {
  const { taskName, taskPrompt, taskResource, taskQuestion } = req.body;
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
      $addToSet: { tasks: savedTask._id }, // mongo operator that adds to array unless tha value is alreay present, in this case it is adding to the lesson array
      //this might need some hashing out^
    });
    next(savedTask);
  } catch (err) {
    next(
      createErr({
        method: 'POST',
        type: 'creating new task',
        err,
      }),
    );
  }
};

lessonController.editTask = async (req, res, next) => {};

lessonController.deleteTask = async (req, res, next) => {};

module.exports = taskController;
