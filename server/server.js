const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRouter = require('./routes/userRouter');
const lessonRouter = require('./routes/lessonRouter');
const taskRouter = require('./routes/taskRouter');
const chatRouter = require('./routes/chatRouter');
// const myURI = '';
// mongoose
//   .connect(myURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });

//need to serve static files

app.use('/api/user', userRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/task', taskRouter);
app.use('/api/chat', chatRouter);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/'));
});

app.use((req, res) => res.sendStatus(404));
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler',
    status: 400,
    message: { err: 'an error has occured' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
