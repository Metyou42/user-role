const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { User } = require('../models/models');

module.exports = async function (req, res, next) {
  try {
    const { url } = req;

    if (url !== '/api/user/login' && url !== '/api/user/registration') {
      const token = req.headers.authorization.split(' ');

      if (token[0] !== 'Bearer') return next(ApiError.badRequest('Invalid method authorizations'));
      if (!token[1]) return next(ApiError.unauthorized('Unauthorized'));

      const decode = jwt.verify(token[1], process.env.SECRET);
      const candidate = await User.findOne({ where: { name: decode.name, id: decode.id } });

      if (!candidate) return next(ApiError.unauthorized('Unauthorized'));

      req.user = decode;
    }
    next();
  } catch (e) {
    next(ApiError.unauthorized('Unauthorized'));
  }
};
