const passport = require('passport');
const UserModel = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

// const mongoose = require('mongoose');

// const um = mongoose.model('users');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

const facebookOptions = {
  clientID: config.facebook_app_id,
  clientSecret: config.facebook_app_secret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'email', 'first_name', 'last_name'],
  passReqToCallback: true,
  enableProof: true
};

const facebookLogin = new FacebookStrategy(facebookOptions, function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  UserModel.findOne({ googleId: profile.id }, function (err, existingUser) {
    if (err) {
      return done(err, false);
    }

    if (existingUser) {
      return done(null, existingUser);
    } else {
      const user = new UserModel({
        email: profile.emails[0].value,
        googleId: profile.id,
        provider: 'google'
      });
      user.save(err => {
        if (err) {
          return done(err, false);
        }

        return done(null, user);
      });
    }
  });
});

const googleOptions = {
  clientID: config.google_client_id,
  clientSecret: config.google_client_secret,
  callbackURL: '/auth/google/callback'
};
const googleLogin = new GoogleStrategy(googleOptions, function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  UserModel.findOne({ googleId: profile.id }, function (err, existingUser) {
    if (err) {
      return done(err, false);
    }

    if (existingUser) {
      return done(null, existingUser);
    } else {
      const user = new UserModel({
        email: profile.emails[0].value,
        googleId: profile.id,
        provider: 'google'
      });
      user.save(err => {
        if (err) {
          return done(err, false);
        }

        return done(null, user);
      });
    }
  });
});

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  UserModel.findOne({ email }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(err, null);
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  UserModel.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
passport.use(facebookLogin);
