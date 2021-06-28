const base64Img = require('base64-img');
const cloudinary = require('../utilis/cloudinary');
const Vendor = require('../Model/Vendor');
const vendorValidation = require('../validation/vendorValidation');

module.exports = async (req, res) => {
  if (req.body.business) {
    try {
      req.body.business = JSON.parse(req.body.business);
    } catch {
      req.body.business = {};
    }
  }
  if (req.body.personalInformation) {
    try {
      req.body.personalInformation = JSON.parse(req.body.personalInformation);
    } catch {
      req.body.personalInformation = {};
    }
  }

  if (req.body.identification) {
    try {
      req.body.identification = JSON.parse(req.body.identification);
    } catch {
      req.body.identification = {};
    }
  }

  if (req.body.businessAddress) {
    try {
      req.body.businessAddress = JSON.parse(req.body.businessAddress);
    } catch {
      req.body.businessAddress = {};
    }
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

  const photoFilePath = await base64Img.imgSync(
    value.identification.photo,
    './server/photo',
    Date.now()
  );

  const photoImage = await cloudinary.uploader.upload(photoFilePath);
  const photo = photoImage.secure_url;

  const { business, identification, personalInformation, businessAddress } =
    value;

  const vendorForm = new Vendor({
    business,
    identification: {
      ...identification,
      photo,
    },
    personalInformation: {
      ...personalInformation,
      faceCapture,
    },

    businessAddress: {
      ...businessAddress,
      picture,
    },
  });
  const data = {
    faceCapture,
    photo,
  };

  await vendorForm.save();
  return res.status(200).send({ message: 'Registered Vendor', data });
};
