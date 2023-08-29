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

module.exports = taskController;
