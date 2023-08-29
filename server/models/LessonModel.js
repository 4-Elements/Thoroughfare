const mongoose = require('mongoose');
const { Schema } = mongoose;
// const myURI = '';
// const URI = process.env.MONGO_URI || myURI;

const Lesson = new Schema({
  lessonID: {
    type: Number,
    required: true,
  },
  lessonNumber: {
    type: Number,
    required: true,
  },
  lessonName: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('Lesson', Lesson);

// Lesson Structures
// Lesson ID X
// Lesson Number X
// Lesson Name X
// Tasks: [all of the tasks in the lesson - basically, an array of the task IDs] X
