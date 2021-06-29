require('express-async-errors');

const multer = require('multer');
const express = require('express');

const router = express.Router();
const storage = require('../utilis/multer');

const upload = multer({ storage });
const vendorForm = require('../controller/vendorController');

const uploads = upload.fields([
  { name: 'faceCapture' },
  { name: 'photo' },
  { name: 'picture' },
]);
router.post('/vendor/registration', uploads, vendorForm);

module.exports = router;
