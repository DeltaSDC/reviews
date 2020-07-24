const config = require('../config.js');
require('newrelic');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/routes.js');

const PORT = config.app.port;

// create express app instance
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// serve static assets
app.use(express.static('public'));

// router
app.use('/reviews', router);
app.get('/loaderio-f6a558ff042a291b7c33f7feb53905d2/', (req, res) => {
  res.status(200).send('loaderio-f6a558ff042a291b7c33f7feb53905d2');
});

// create server on port 3004
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
