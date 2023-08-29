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
    const allTasks = await Lessons.find({});
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
  // mentorAccess=[Mentor._id], tasks=[]
  try {
    const newLesson = new Lesson({
      lessonNumber: lessonNumber,
      lessonName: lessonName,
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
  // mentorAccess=[Mentor._id], tasks=[]
  // try {
  //   const newLesson = new Lesson({
  //     lessonNumber: lessonNumber,
  //     lessonName: lessonName,
  //   });
  //   const savedLesson = await newLesson.save();
  //   next();
  // } catch (err) {
  //   next(
  //     createErr({
  //       method: 'POST',
  //       type: 'creating new lesson',
  //       err,
  //     }),
  //   );
  // }
};

lessonController.deleteLesson = async (req, res, next) => {
  const { lessonNumber, lessonName } = req.body;
  // mentorAccess=[Mentor._id], tasks=[]
  // try {
  //   const newLesson = new Lesson({
  //     lessonNumber: lessonNumber,
  //     lessonName: lessonName,
  //   });
  //   const savedLesson = await newLesson.save();
  //   next();
  // } catch (err) {
  //   next(
  //     createErr({
  //       method: 'POST',
  //       type: 'creating new lesson',
  //       err,
  //     }),
  //   );
  // }
};

module.exports = lessonController;
