const Joi = require('joi');

module.exports = function validate(input) {
  const schema = Joi.object({
    faceCapture: Joi.string(),
    photo: Joi.string().label('identification picture'),
    picture: Joi.string().label('business address picture'),
    business: Joi.object().keys({
      name: Joi.string().required().label('business name'),
      BVN: Joi.number().integer().positive().label('bank verification number'),
      kind: Joi.string().valid('individual', 'corporate'),
      registrationCertificateNumber: Joi.when('kind', {
        is: 'corporate',
        then: Joi.number()
          .integer()
          .positive()
          .required()
          .label('registration certificate number'),
      }),
      number: Joi.when('kind', {
        is: 'corporate',
        then: Joi.number()
          .integer()
          .positive()
          .required()
          .label('business number'),
      }),
      AccountNumber: Joi.number().integer().positive().label('account number'),
    }),

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
    }),

    identification: Joi.object().keys({
      kind: Joi.string().valid('votersCard', 'intlPassport', 'nationalId'),
    }),

    address: Joi.object().keys({
      location: Joi.string().min(3).max(300).lowercase().trim().required(),
      landmark: Joi.string().min(2).max(200).lowercase().trim().required(),
      phoneNumber: Joi.string().min(7).max(15).trim().required(),
      phoneNumberOfDirectors: Joi.string()
        .min(7)
        .max(15)
        .trim()
        .required()
        .label('phone number of directors'),
    }),
  });

  return schema.validate(input);
};
