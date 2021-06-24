const debug = require('debug')('app');
require('dotenv').config();

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
      process.exist(1);
    }
    if (!process.env.debug) {
      debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
      process.exist(1);
    }
    if (!process.env.MONGODBURI) {
      debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
      process.exist(1);
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
      process.exist(1);
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
      process.exist(1);
    }
  }
};

// const debug = require('debug')('app');
// require('dotenv').config();

// module.exports = () => {

//     if (process.env.NODE_ENV === 'production') {
//         if (!process.env.CLOUDINARY_CLOUD_NAME ) {
//           debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//           process.exist(1);
//         }
//       }

//       if (process.env.NODE_ENV === 'production') {
//         if (!process.env.debug ) {
//           debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//           process.exist(1);
//         }
//       }

//       if (process.env.NODE_ENV === 'production') {
//         if (!process.env.MONGODBURI ) {
//           debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//           process.exist(1);
//         }
//       }

//       if (process.env.NODE_ENV === 'production') {
//         if (!process.env.CLOUDINARY_API_KEY) {
//           debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//           process.exist(1);
//         }
//       }

//       if (process.env.NODE_ENV === 'production') {
//         if (!process.env.CLOUDINARY_API_SECRET) {
//           debug(`FATAL ERROR: ENVIRONMENT VARIABLE NOT FOUND`);
//           process.exist(1);
//         }
//       }

// };
