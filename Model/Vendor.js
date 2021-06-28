const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    business: {
      name: String,
      BVN: Number,
      typee: String,
      registrationCertificateNumber: Number,
      number: Number,
      AccountNumber: Number,
    },
    personalInformation: {
      firstname: String,
      lastname: String,
      sex: String,
      age: Number,
      phone: String,
      email: String,
      nationality: String,
      state: String,
      residentialAddress: String,
      city: String,
      faceCapture: String,
    },
    identification: {
      photo: String,
      typee: String,
    },

    businessAddress: {
      location: String,
      landmark: String,
      picture: String,
      phoneNumber: String,
      phoneNumberOfDirectors: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
