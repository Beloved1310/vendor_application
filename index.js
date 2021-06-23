const express = require('express');
const cors = require('cors');
require('dotenv').config();
const debug = require('debug')('app');
const { PORT } = require('./config');

const app = express();
require('./startup/db')();

const vendor = require('./routes/vendor');

app.use(cors({ origin: '*' }));
app.use(express.static('./server/faceCapture'));
app.use(express.static('./server/votersCard'));
app.use(express.static('./server/nationalId'));
app.use(express.static('./server/passport'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use('/', vendor);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).send({ message: err.message });
  }
  next(err);
});

app.listen(PORT, () => {
  debug(`Web server is running ${PORT}`);
});
