const express = require('express');
const validate = require('./validate.js');
const mongoose = require('mongoose');
const documentsRouter = require('../routes/documents.js');
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/docs';

app.use(express.static('public'));

mongoose.connect(
    DATABASE_URL,
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
app.use('/docs', documentsRouter);


app.listen(PORT, () => console.log(`listening on port: ${PORT}`));