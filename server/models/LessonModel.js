const mongoose = require('mongoose');
const { Schema } = mongoose;

const myURI = 'mongodb+srv://tristan913:1234@cluster0.zlp4cgx.mongodb.net/';
const URI = process.env.MONGO_URI || myURI;

const Lesson = new Schema({
  lessonNumber: {
    type: Number,
    required: true,
  },
  lessonName: {
    type: String,
    required: true,
  },
  mentorAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
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
