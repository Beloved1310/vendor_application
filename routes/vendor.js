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
// router.post(
//   '/vendor/registration',
//   uploads(req, res, function (err){
//     if(err){
//       return res.send('Error uploading your new avatar')
//     }

//   }),
//   vendorForm
// );

// app.post('/profile', upload, function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end('Error uploading your new avatar')
//     }

//     res.end('You new avatar is uploaded')
//   }
// }),

module.exports = router;
