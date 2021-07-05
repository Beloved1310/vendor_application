require('express-async-errors');

const multer = require('multer');
const express = require('express');

const router = express.Router();
const storage = require('../utilis/multer');

const upload = multer({ storage }).fields([
  { name: 'faceCapture' },
  { name: 'photo' },
  { name: 'picture' },
]);
const vendorForm = require('../controller/vendorController');

router.post('/vendor/registration', upload, vendorForm);

module.exports = router;
