const Joi = require('joi');

module.exports = function validate(input) {
  const schema = Joi.object({
    businessName: Joi.string(),
    picture: Joi.string(),
    BVN: Joi.number().integer().positive(),
    BusinessType: Joi.string().valid('individual', 'corporate'),
    registrationCertificateNumber: Joi.when('BusinessType', {
      is: 'corporate',
      then: Joi.number()
        .integer()
        .positive()
        .required()
        .label('registration certificate number is required'),
    }),
    BusinessNumber: Joi.when('BusinessType', {
      is: 'corporate',
      then: Joi.number()
        .integer()
        .positive()
        .required()
        .label('business number is required'),
    }),
    AccountNumber: Joi.number().integer().positive(),

    personalInformation: Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      sex: Joi.string().required().min(2).max(20).lowercase().trim().required(),
      age: Joi.date().required(),
      phone: Joi.string().min(7).max(15).required(),
      email: Joi.string().email().min(3).max(500).lowercase().required(),
      nationality: Joi.string().lowercase().trim().required(),
      state: Joi.string().trim().required(),
      residentialAddress: Joi.string().trim().required(),
      city: Joi.string().trim().required(),
      faceCapture: Joi.string().required(),
    }),

    meansOfIdentifaction: Joi.object()
      .keys({
        votersCard: Joi.string().allow(''),
        nationalId: Joi.when('votersCard', {
          is: '',
          then: Joi.string().required().label('iiii'),
          otherwise: Joi.string().allow(''),
        }),
        passport: Joi.when('votersCard', {
          is: '',
          then: Joi.string(),
          otherwise: Joi.string().allow(''),
        }).when(' nationalId', {
          is: '',
          then: Joi.string(),
          otherwise: Joi.string().allow(''),
        }),
      })
      .or('votersCard', 'nationalId', 'passport'),

    businessAddress: Joi.object().keys({
      location: Joi.string().min(3).max(300).lowercase().trim().required(),
      landmark: Joi.string().min(2).max(200).lowercase().trim().required(),
      phoneNumber: Joi.string().min(7).max(15).trim().required(),
      phoneNumberOfDirectors: Joi.string().min(7).max(15).trim().required(),
    }),
  });

  return schema.validate(input);
};
