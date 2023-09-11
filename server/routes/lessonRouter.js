const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const userController = require('../controllers/userController');

//getting all lessons
router.get(
  '/',
  userController.authorize,
  lessonController.allLessons,
  (req, res) => {
    res.status(200).json();
  },
);

//adding a new lesson
router.post(
  '/newLesson',
  userController.authorize,
  lessonController.newLesson,
  (req, res) => {
    res.status(200).json(req.savedLesson);
  },
);

//deleting lesson
router.delete('/:lessonNumber', lessonController.deleteLesson, (req, res) => {
  res.sendStatus(200);
});
module.exports = router;
