const Joi = require('joi');

module.exports = function validate(input) {
  const schema = Joi.object({
    faceCapture: Joi.string().label('face capture'),
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
      firstname: Joi.string().required().label('first name'),
      lastname: Joi.string().required().label('last name'),
      sex: Joi.string()
        .required()
        .min(2)
        .max(20)
        .lowercase()
        .trim()
        .required()
        .label('sex'),
      age: Joi.date().required().label('age'),
      phone: Joi.string().min(7).max(15).required().label('phone number'),
      email: Joi.string()
        .email()
        .min(3)
        .max(500)
        .lowercase()
        .required()
        .label('email'),
      nationality: Joi.string()
        .lowercase()
        .trim()
        .required()
        .label('nationality'),
      state: Joi.string().trim().required().label('state'),
      residentialAddress: Joi.string()
        .trim()
        .required()
        .label('residential address'),
      city: Joi.string().trim().required().label('city'),
    }),

    identification: Joi.object().keys({
      kind: Joi.string()
        .valid('votersCard', 'intlPassport', 'nationalId')
        .label('voterCard / intlPassport / nationalId is required'),
    }),

    address: Joi.object().keys({
      location: Joi.string()
        .min(3)
        .max(300)
        .lowercase()
        .trim()
        .required()
        .label('location'),
      landmark: Joi.string()
        .min(2)
        .max(200)
        .lowercase()
        .trim()
        .required()
        .label('landmark'),
      phoneNumber: Joi.string()
        .min(7)
        .max(15)
        .trim()
        .required()
        .label('phone number'),
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
