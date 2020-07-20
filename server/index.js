const config = require('../config.js');
require('newrelic');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/routes.js');

const PORT = config.app.port;
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// serve static assets
app.use(express.static('public'));

// router
app.use('/reviews', router);

// create server on port 3004
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
