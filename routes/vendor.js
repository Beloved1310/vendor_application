require('express-async-errors');


const multer = require('multer');
const express = require('express');

const router = express.Router();
const storage = require('../utilis/multer');

const upload = multer({ storage });
const vendorForm = require('../controller/vendorController');

router.post('/vendor/registration', upload.single('picture'), vendorForm);

module.exports = router;