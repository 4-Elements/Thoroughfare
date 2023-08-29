const path = require('path');
const express = require('express');

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/'));
  });
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });