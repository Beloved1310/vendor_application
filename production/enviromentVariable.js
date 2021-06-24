require('dotenv').config();

const enviromentVariable = {
  MONGODBURI: process.env.MONGODBURI,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_KEY,
  debug: process.env.debug,
};

module.exports = enviromentVariable;
