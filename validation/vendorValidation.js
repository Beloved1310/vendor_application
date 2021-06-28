const Joi = require('joi');

module.exports = function validate(input) {
  const schema = Joi.object({
    business: Joi.object().keys({
      name: Joi.string().required(),
      BVN: Joi.number().integer().positive(),
      typee: Joi.string().valid('individual', 'corporate'),
      registrationCertificateNumber: Joi.when('typee', {
        is: 'corporate',
        then: Joi.number().integer().positive().required(),
      }),
      number: Joi.when('typee', {
        is: 'corporate',
        then: Joi.number().integer().positive().required(),
      }),
      AccountNumber: Joi.number().integer().positive(),
    }),

    picture: Joi.string(),

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

    identification: Joi.object().keys({
      photo: Joi.string().required(),
      typee: Joi.string().valid('votersCard', 'intlPassport', 'nationalId'),
    }),

    businessAddress: Joi.object().keys({
      location: Joi.string().min(3).max(300).lowercase().trim().required(),
      landmark: Joi.string().min(2).max(200).lowercase().trim().required(),
      phoneNumber: Joi.string().min(7).max(15).trim().required(),
      phoneNumberOfDirectors: Joi.string().min(7).max(15).trim().required(),
    }),
  });

  return schema.validate(input);
};
