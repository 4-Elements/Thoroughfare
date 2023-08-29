const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const myURI =
  'mongodb+srv://aderritt6158:qjxKqRlDpUZ9ZStC@cluster0.rti6q70.mongodb.net/sandbox?retryWrites=true&w=majority';
mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//need to server express files
// app.use('/messages', messageRouting);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/'));
});

app.get('/api', (req, res) => {
  res.send('Received!');
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
