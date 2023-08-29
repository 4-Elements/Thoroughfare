const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//checking user for login
router.get('/', userController.getUser, (req, res) => {
  res.status(200).json({ message: 'User created successfully' });
});

//creating new user
router.post('/createUser', userController.createUser, (req, res) => {
  res.status(200).json({ message: 'User created successfully' });
});

//deleting user account
router.delete('/', userController.deleteUser, (req, res) => {
  res.status(200).json({ message: 'User successfully deleted' });
});

module.exports = router;
