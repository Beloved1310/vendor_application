/* eslint array-callback-return: "off" */

const debug = require('debug')('app');
require('dotenv').config();
// const pp = require('./enviromentVariable');
const ff = require('../config');

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
      if (!ff[key]) {
        debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
        process.exist(1);
      }
    });
  }
};

// module.exports = () => {
//   if (process.env.NODE_ENV === 'production') {
//     if (!process.env.CLOUDINARY_CLOUD_NAME) {
//       debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//       process.exist(1);
//     }
//     if (!process.env.debug) {
//       debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//       process.exist(1);
//     }
//     if (!process.env.MONGODBURI) {
//       debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//       process.exist(1);
//     }
//     if (!process.env.CLOUDINARY_API_KEY) {
//       debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//       process.exist(1);
//     }
//     if (!process.env.CLOUDINARY_API_SECRET) {
//       debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//       process.exist(1);
//     }
//   }
// };
