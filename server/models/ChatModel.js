const mongoose = require('mongoose');
const { Schema } = mongoose;
// const myURI =
//   'mongodb+srv://jacob05311991:SimplePassword@cluster0.b885ied.mongodb.net/?retryWrites=true&w=majority';
// const URI = process.env.MONGO_URI || myURI;

const Chat = new Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      sent: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Chat', Chat);

// Chat Structures
// Chat ID
// Array of Messages, each with:
// Sender (mentor or mentee ID)
// Timestamp
// Message
