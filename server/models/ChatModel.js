const mongoose = require('mongoose');
const { Schema } = mongoose;
const myURI = '';
const URI = process.env.MONGO_URI || myURI;

// const Chat = new Schema({
//   chatID: {
//     type: Number,
//     required: true,
//   },
//   messages: [
//     sender:

//   ]
// });

// module.exports = mongoose.model('Chat', Chat;

// Chat Structures
// Chat ID
// Array of Messages, each with:
// Sender (mentor or mentee ID)
// Timestamp
// Message
