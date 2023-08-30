const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

//getting all lessons
router.get('/', userController.authorize, lessonController.allLessons, (req, res) => {
  res.status(200).json();
});

//adding a new lesson
router.post('/newLesson', lessonController.newLesson, (req, res) => {
  res.status(200).json();
});

//deleting lesson
router.delete('/:lessonNumber', lessonController.deleteLesson, (req, res) => {
  res.sendStatus(200);
});
module.exports = router;
