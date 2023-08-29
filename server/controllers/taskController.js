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

module.exports = taskController;

//   - Add Task.\_id to the Lesson.tasks array
// - Add another mentor to lesson
//   - Use mentor's mentorCode to find Mentor.\_id and add that to the Lesson's mentorAccess, and add the Lesson.\_id to that Mentor's lessonsAccess []
// - Assign a Lesson to a Mentee
//   - Add Lesson.\_id to user's lessonsAssigned []
// - Things you can view:
//   - Your mentor code
//   - Lessons in lessonsAccess (Number + Name)
//     - See tasks []
//       - Tasks show taskName, taskPrompt, taskResource
//   - Mentees (Name + Tasks-Complete / Total-Tasks)
//     - See lessons[] with tasks-complete / total-tasks in that lesson
//       - Click in a lesson(?) to see completion-status-check, taskname
//       - Click in to see taskName, taskComplete, taskPrompt, taskResource, taskQuestion, and user's response
