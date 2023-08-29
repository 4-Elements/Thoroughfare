const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

//getting all lessons
router.get('/', lessonController.allLessons, (req, res) => {
  res.status(200).json();
});
//adding a new lesson
router.post('/newTask', lessonController.newLesson, (req, res) => {
  res.status(200).json();
});
//deleting lesson
router.delete('/deleteLesson', lessonController.deleteLesson, (req, res) => {
  res.status(200).json();
});
module.exports = router;
