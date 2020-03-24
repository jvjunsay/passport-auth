const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

const requireGoogleSignIn = passport.authenticate('google', {
  session: false,
  scope: ['profile', 'email']
});

const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
});

const requireFacebookSignIn = passport.authenticate('facebook', {
  session: false,
  scope: ['profile', 'email']
});

const facebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/',
  session: false
});

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.send({ m: 'hi there' });
  });
  app.post('/api/signup', Authentication.signup);
  app.post('/api//signin', requireSignIn, Authentication.signIn);
  app.get('/auth/google', (req, res, next) => {
    req.session.returnTo = req.header('Referer');
    passport.authenticate('google', {
      session: false,
      scope: ['profile', 'email']
    })(req, res, next);
  });
  app.get('/auth/google/callback', googleCallback, Authentication.googleSignInCallBack);
  app.get('/auth/facebook', requireFacebookSignIn, Authentication.signIn);
  app.get('/auth/facebook/callback', facebookCallback, Authentication.signIn);
  app.get('/api/currentuser', Authentication.currentUser);
};
