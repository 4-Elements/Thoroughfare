const mongoose = require('mongoose');
const { Schema } = mongoose;
// const myURI =
//   'mongodb+srv://jacob05311991:SimplePassword@cluster0.b885ied.mongodb.net/?retryWrites=true&w=majority';
// const URI = process.env.MONGO_URI || myURI;

const Task = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskPrompt: String,
  taskResource: String,
  taskQuestion: String,
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
