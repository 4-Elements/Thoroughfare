const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

//might need to use :ID for for all of these? in order to add to the specifc task chat
router.get('/', chatController.allChats, (req, res) => {
  res.status(200).json();
});

//adding a new chat
router.post('/newTask', chatController.newChat, (req, res) => {
  res.status(200).json();
});

//deleting chat
router.delete('/deleteLesson', chatController.deleteChat, (req, res) => {
  res.status(200).json();
});
module.exports = router;
