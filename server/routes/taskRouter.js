const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
//getting all tasks
router.get('/', taskController.allTasks, (req, res) => {
  res.status(200).json();
});

//creating new task
router.post('/newTask', taskController.newTask, (req, res) => {
  res.status(200).json();
});
//
router.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200).json();
});
module.exports = router;
