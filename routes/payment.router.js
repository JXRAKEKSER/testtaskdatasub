const { Router } = require('express');
const { payment } = require('../constrollers/payment.controller');
const { paymentValidator } = require('../middlewares/validators/payment.requestValidation');

const router = new Router();

router.post('/', paymentValidator, payment);

module.exports = router;
