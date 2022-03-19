const { Schema, model } = require('mongoose');
const ValidationError = require('../errors/ValidationError');

const PaymentSchema = new Schema({
  cardNumber: {
    type: String,
    required: true,
    maxlength: 16,
    minlength: 16,
  },
  cvcCode: {
    type: String,
    required: true,
    maxlength: 3,
    minlength: 3,
  },
  expDate: {
    type: String,
    required: true,
    maxlength: 7,
    minlength: 7,
  },
  amount: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

PaymentSchema.statics.validateAmount = function (amount) {
  if (Number(amount) < 10) {
    throw new ValidationError('Значение суммы меньше 10');
  }
};

module.exports = model('Payment', PaymentSchema);
