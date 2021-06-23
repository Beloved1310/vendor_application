/* eslint vars-on-top: "off" */
/* eslint no-var: "off" */
/* eslint block-scoped-var: "off" */

const base64Img = require('base64-img');
const cloudinary = require('../utilis/cloudinary');
const Vendor = require('../Model/Vendor');
const vendorValidation = require('../validation/vendorValidation');

module.exports = async (req, res) => {
  if (
    typeof req.body.personalInformation !== 'object' ||
    typeof req.body.meansOfIdentifaction !== 'object' ||
    typeof req.body.businessAddress !== 'object'
  ) {
    req.body.personalInformation = JSON.parse(req.body.personalInformation);
    req.body.meansOfIdentifaction = JSON.parse(req.body.meansOfIdentifaction);
    req.body.businessAddress = JSON.parse(req.body.businessAddress);
  }

  const { value, error } = vendorValidation(req.body);

  if (error) return res.status(400).send({ error: error.details[0].message });
  const { secure_url: picture } = await cloudinary.uploader.upload(
    req.file.path
  );

  const faceCaptureFilePath = await base64Img.imgSync(
    value.personalInformation.faceCapture,
    './server/faceCapture',
    Date.now()
  );

  const faceCaptureImage = await cloudinary.uploader.upload(
    faceCaptureFilePath
  );
  const faceCapture = faceCaptureImage.secure_url;

  if (value.meansOfIdentifaction.votersCard) {
    const votersCardFilePath = await base64Img.imgSync(
      value.meansOfIdentifaction.votersCard,
      './server/votersCard',
      Date.now()
    );
    const votersCardImage = await cloudinary.uploader.upload(
      votersCardFilePath
    );
    var votersCard = votersCardImage.secure_url;
  }

  if (value.meansOfIdentifaction.nationalId) {
    const nationalIdFilePath = await base64Img.imgSync(
      value.meansOfIdentifaction.nationalId,
      './server/nationalId',
      Date.now()
    );
    const nationalIdImage = await cloudinary.uploader.upload(
      nationalIdFilePath
    );
    var nationalId = nationalIdImage.secure_url;
  }

  if (value.meansOfIdentifaction.passport) {
    const passportFilePath = await base64Img.imgSync(
      value.meansOfIdentifaction.passport,
      './server/passport',
      Date.now()
    );
    const passportImage = await cloudinary.uploader.upload(passportFilePath);
    var passport = passportImage.secure_url;
  }

  const {
    businessName,
    BVN,
    BusinessType,
    registrationCertificateNumber,
    BusinessNumber,
    AccountNumber,
    personalInformation,
    businessAddress,
  } = value;
  const { location, landmark, phoneNumber, phoneNumberOfDirectors } =
    businessAddress;
  const {
    firstname,
    lastname,
    sex,
    age,
    phone,
    email,
    nationality,
    state,
    residentialAddress,
    city,
  } = personalInformation;

  const vendorForm = new Vendor({
    businessName,
    BVN,
    BusinessType,
    registrationCertificateNumber,
    BusinessNumber,
    AccountNumber,
    personalInformation: {
      firstname,
      lastname,
      sex,
      age,
      phone,
      email,
      nationality,
      state,
      residentialAddress,
      city,
      faceCapture,
    },
    meansOfIdentifaction: {
      votersCard,
      nationalId,
      passport,
    },
    businessAddress: {
      picture,
      location,
      landmark,
      phoneNumber,
      phoneNumberOfDirectors,
    },
  });
  const data = {
    faceCapture,
    votersCard,
    nationalId,
    passport,
  };

  await vendorForm.save();
  return res.status(200).send({ message: 'Registered Vendor', data });
};
