const mongoose = require('mongoose');
const { Schema } = mongoose;

const myURI = 'mongodb+srv://tristan913:1234@cluster0.zlp4cgx.mongodb.net/';
const URI = process.env.MONGO_URI || myURI;

const User = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email exists.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a Password!'],
  },
  // userType: {
  //   type: String,
  // },
  // mentorCode: {
  //   type: String,
  //   required: true,
  // },
  // menteeIds: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  // lessonsAccess: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Lesson',
  //   },
  // ],
  // lessonsAssigned: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Lesson',
  //   },
  // ],
  // taskProgress: [
  //   {
  //     task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  //     completed: { type: Boolean, required: true, default: false },
  //     response: String,
  //   },
  // ],
  // activeChats: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Chat',
  //   },
  // ],
});

module.exports = mongoose.model('User', User);

//   All
// Username X
// Password X
// Session stuff (yikes)
// User Type (Mentor / Mentee) X
// Mentor Code (Mentors: their code; Mentees: their mentor’s code) X
// [Active Chats IDs]
// Mentors:
// [Mentee Ids] X
// [Lessons they have access to] X
// Mentees
// [ {Lessons they have been assigned} ] X
// {Lesson Progress}
