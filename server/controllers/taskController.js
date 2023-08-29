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
  // const { lessonNumber, lessonName} = req.body;
  // mentorAccess=[Mentor._id], tasks=[]
  try {
    const newTask = new Task({
      taskName: taskName,
      taskPrompt: taskPrompt,
      taskResource: taskResource,
      taskQuestion: taskQuestion,
    });
    const savedTask = await newTask.save();
    next();
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
// - Add new Task to a Lesson
//   - Add Task.\_id to the Lesson.tasks array ???

lessonController.editTask = async (req, res, next) => {
  // const { lessonNumber, lessonName} = req.body;
  // mentorAccess=[Mentor._id], tasks=[]
  // try {
  //   const savedTask = await newTask.save();
  //   next();
  // } catch (err) {
  //   next(
  //     createErr({
  //       method: 'POST',
  //       type: 'creating new task',
  //       err,
  //     }),
  //   );
  // }
};

lessonController.deleteTask = async (req, res, next) => {
  // const { lessonNumber, lessonName} = req.body;
  // mentorAccess=[Mentor._id], tasks=[]
  // try {
  //   const savedTask = await newTask.save();
  //   next();
  // } catch (err) {
  //   next(
  //     createErr({
  //       method: 'POST',
  //       type: 'creating new task',
  //       err,
  //     }),
  //   );
  // }
};

module.exports = taskController;

//   - Use mentor's mentorCode to find Mentor.\_id and add that to the Lesson's mentorAccess, and add the Lesson.\_id to that Mentor's lessonsAccess []
