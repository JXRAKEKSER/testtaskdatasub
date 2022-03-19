const ValidationError = require('../errors/ValidationError');

module.exports = (error, req, res, next) => {
  if (error.statusCode === 400) {
    next(new ValidationError(error.message));
  } else if (error.name === 'ValidationError') {
    next(new ValidationError(error.message));
  }
  next(error);
};
