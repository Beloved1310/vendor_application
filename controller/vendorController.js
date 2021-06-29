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

  if (req.body.address) {
    try {
      req.body.address = JSON.parse(req.body.address);
    } catch {
      req.body.address = {};
    }
  }

  const { value, error } = vendorValidation(req.body);

  if (error) return res.status(400).send({ error: error.details[0].message });

  const { secure_url: picture } = await cloudinary.uploader.upload(
    req.files.picture[0].path
  );
  const { secure_url: photo } = await cloudinary.uploader.upload(
    req.files.photo[0].path
  );
  const { secure_url: faceCapture } = await cloudinary.uploader.upload(
    req.files.faceCapture[0].path
  );

  const { business, identification, personalInformation, address } = value;

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

    address: {
      ...address,
      picture,
    },
  });
  const data = {
    faceCapture,
    photo,
    picture,
  };

  await vendorForm.save();
  return res.status(200).send({ message: 'Registered Vendor', data });
};
