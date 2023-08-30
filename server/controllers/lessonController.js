const mongoose = require('mongoose');
const Lesson = require('../models/LessonModel');
const User = require('../models/UserModel.js');

const lessonController = {};

const createErr = error => {
  const { method, type, err } = error;
  return {
    log: `lessonController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in lessonController.${method}. Check server logs for more details.`,
    },
  };
};
//getting all lessons
lessonController.allLessons = async (req, res, next) => {
  try {
    const allLessons = await Lessons.find({});
    next();
  } catch (err) {
    next(
      createErr({
        method: 'Get',
        type: 'getting all lessons',
        err,
      }),
    );
  }
};

//creating a new lesson
lessonController.newLesson = async (req, res, next) => {
  const { lessonNumber, lessonName } = req.body;
  try {
    console.log('entered');
    const newLesson = new Lesson({
      lessonNumber: lessonNumber,
      lessonName: lessonName,
      mentorAccess: [req.userId],
      tasks: [],
    });

    const savedLesson = await newLesson.save();
    console.log('Saved Lesson:', savedLesson);
    await User.updateMany(
      { $addToSet: { lessonsAccess: savedLesson._id } }, // ?? still needs figuiring out but updated the lessonAccess of the User?
    );

    next();
  } catch (err) {
    console.log(err);
    next(
      createErr({
        method: 'POST',
        type: 'creating new lesson',
        err,
      }),
    );
  }
};

// - Add new Task to a Lesson
//   - Store taskName, taskPrompt, taskResource, taskQuestion
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

//editing a new lesson
lessonController.editLesson = async (req, res, next) => {
  const { lessonNumber, lessonName } = req.body;
};

lessonController.deleteLesson = async (req, res, next) => {
  const { lessonNumber } = req.params;
  try {
    const response = await Message.findOneAndDelete({ message });
    res.locals.deletedMessage = response;
    next();
  } catch (err) {
    next(
      createErr({
        method: 'DELETE',
        type: 'deleting new lesson',
        err,
      }),
    );
  }
};

module.exports = lessonController;
