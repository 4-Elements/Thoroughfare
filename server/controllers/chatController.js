const mongoose = require('mongoose');
const Chat = require('../routes/chatRouter');

const chatController = {};

const createErr = error => {
  const { method, type, err } = error;
  return {
    log: `chatController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in chatController.${method}. Check server logs for more details.`,
    },
  };
};

//getting all chats for specific task
chatController.allChats = async (req, res, next) => {
  try {
    const allChats = await Chats.find({});
    next();
  } catch (err) {
    next(
      createErr({
        method: 'GET',
        type: 'getting task chats',
        err,
      }),
    );
  }
};

//creating new chat
chatController.newChat = async (req, res, next) => {
  try {
    const newChat = new Chat({});
    const savedChat = await newChat.save();
    next();
  } catch (err) {
    next(
      createErr({
        method: 'POST',
        type: 'saving new chat',
        err,
      }),
    );
  }
};

module.exports = taskController;
