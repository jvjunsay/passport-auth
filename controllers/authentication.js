const User = require('../models/user');
const utility = require('../utility');
// const jwt = require('jwt-simple');
// const config = require('../config');

// const tokenForUser = function (user) {
//   const iat = new Date().getTime();
//   return jwt.encode({ sub: user.id, iat }, config.secret);
// };

exports.signup = (req, res, next) => {
  console.log('signup');
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({
        error: 'email is in use'
      });
    }

    const user = new User({ email, password });
    user.save(err => {
      if (err) {
        return next(err);
      }

      return res
        .status(200)
        .send({ success: true, token: utility.tokenForUser(user) });
    });
  });
};

exports.signIn = (req, res, next) => {
  return res
    .status(200)
    .send({ success: true, token: utility.tokenForUser(req.user) });
};

exports.googleSignInCallBack = (req, res, next) => {
  const token = utility.tokenForUser(req.user);
  const redirect = req.session.returnTo
    ? req.session.returnTo + '?token=' + token
    : '/';
  res.redirect(redirect);
  delete req.session.returnTo;
};

exports.currentUser = (req, res, next) => {
  const decodedToken = utility.decodeToken(req.query.token);

  User.findById(decodedToken.sub, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      const { email } = existingUser;
      return res.status(200).send({
        user: { email },
        token: req.query.token
      });
    } else {
      return res.status(200).send({
        errorMessage: 'User not found.'
      });
    }
  });
};
