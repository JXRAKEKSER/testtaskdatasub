const { Joi, celebrate } = require('celebrate');

const cardNumberRegExp = /\d{16}/;
const cvcCodeRegExp = /\d{3}/;
const expDateRegExp = /((0[1-9])|(1[0-2]))\/202[2-9]/;
const paymentValidator = celebrate({
  body: Joi.object().keys({
    cardNumber: Joi.string().length(16).pattern(cardNumberRegExp).required(),
    cvcCode: Joi.string().length(3).pattern(cvcCodeRegExp).required(),
    expDate: Joi.string().length(7).pattern(expDateRegExp).required(),
    amount: Joi.number().min(1).required(),
  }),
});

module.exports = {
  paymentValidator,
};
