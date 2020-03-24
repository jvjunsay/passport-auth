const jwt = require('jwt-simple');
const config = require('./config');

exports.tokenForUser = function(user) {
  const iat = new Date().getTime();
  return jwt.encode({ sub: user.id, iat }, config.secret);
};
