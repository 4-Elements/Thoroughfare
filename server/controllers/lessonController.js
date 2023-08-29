const mongoose = require('mongoose');
const Lesson = require('../routes/lessonRouter');

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
    const newLesson = new Lesson({
      lessonNumber: lessonNumber,
      lessonName: lessonName,
      mentorAccess: [], //mentor id will be added?
      tasks: [], //tasks are added through the task controller specific by id
    });
    const savedLesson = await newLesson.save();
    next();
  } catch (err) {
    next(
      createErr({
        method: 'POST',
        type: 'creating new lesson',
        err,
      }),
    );
  }
};

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
