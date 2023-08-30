const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

//getting all tasks
router.get('/', taskController.allTasks, (req, res) => {
  res.status(200).json();
});

//creating new task
router.post(
  '/newTask',
  userController.authorize,
  taskController.newTask,
  (req, res) => {
    res.status(200).json(req.savedTask);
  },
);

router.post(
  '/markComplete',
  userController.authorize,
  taskController.markComplete,
  (req, res) => {
    res.status(200).json('Task marked as complete');
  },
);

router.post(
  '/taskResponse',
  userController.authorize,
  taskController.taskResponse,
  (req, res) => {
    res.status(200).json(req.response);
  },
);

router.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200).json();
});
module.exports = router;
