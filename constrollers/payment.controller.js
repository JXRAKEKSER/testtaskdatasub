const Payment = require('../models/Payment');

const payment = async (req, res, next) => {
  try {
    Payment.validateAmount(req.body.amount);
    const { _id, amount } = await Payment.create(req.body);
    return res.json({ requestId: _id, amount });
  } catch (error) {
    console.log(error.name);
    next(error);
  }
};

module.exports = {
  payment,
};
