const Apierror = require('../error/ApiError');

module.exports = function (err, req, res, next) {
  if (err instanceof Apierror) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Unexpected Error' });
};
