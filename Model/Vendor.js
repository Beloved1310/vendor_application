const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    businessName: String,
    BVN: Number,
    BusinessType: String,
    registrationCertificateNumber: Number,
    BusinessNumber: Number,
    AccountNumber: Number,
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
    meansOfIdentifaction: {
      votersCard: String,
      nationalId: String,
      passport: String,
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
