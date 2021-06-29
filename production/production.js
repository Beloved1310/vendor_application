/* eslint array-callback-return: "off" */

const debug = require('debug')('app');
require('dotenv').config();
const config = require('../config');

module.exports = () => {
  const keys = [
    'CLOUDINARY_CLOUD_NAME',
    'MONGODBURI',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'debug',
  ];

  if (process.env.NODE_ENV === 'production') {
    keys.map((key) => {
      if (!config[key]) {
        debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
        process.exit(1);
      }
    });
  }
};
