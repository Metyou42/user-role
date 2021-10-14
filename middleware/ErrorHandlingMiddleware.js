const Apierror = require('../error/ApiError');

module.exports = function (err, req, res) {
  if (err instanceof Apierror) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: 'Unexpected Error' });
};
