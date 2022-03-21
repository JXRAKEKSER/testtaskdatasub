const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { PORT } = require('./config');
const corsHandler = require('./middlewares/cors.middleware');
const vendorErorsHandler = require('./middlewares/vendorErrors.middleware');
const paymentRouter = require('./routes/payment.router');

const app = express();

app.use(express.json());
app.use(corsHandler);

app.use('/payment', paymentRouter);

app.use(errors());
app.use(vendorErorsHandler, (error, req, res, next) => { // eslint-disable-line no-unused-vars
  if (error.sendError) {
    return error.sendError(res);
  }
  return res.status(500).json({ message: 'Ошибка на сервере' });
});
const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testtaskdatasub');
    app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
