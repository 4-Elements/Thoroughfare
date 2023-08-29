const mongoose = require('mongoose');
const { Schema } = mongoose;
// const myURI = '';
// const URI = process.env.MONGO_URI || myURI;

const Task = new Schema({
  taskID: {
    type: Number,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  taskNumber: {
    type: Number,
    required: true,
  },
  taskType: {
    type: String,
    required: true,
  },
  taskPrompt: {
    type: String,
  },
  taskResources: [
    {
      type: String,
    },
  ],
  taskQuestion: {
    type: String,
  },
  taskQuestionResponse: {
    type: String,
  },
  chat: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      message: String,
    },
  ],
  taskComplete: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Task', Task);

// Task // Progress Structures
// Task ID X
// Task Name X
// Task Number X
// Task Type X
// Task Prompt (directions for the task) X
// Task Resources (the link to the URL or article) X
// Task Question (if included, it means a constructed response field is required) X
// Chat [array of chat objects] X
// Task complete?  Boolean X
