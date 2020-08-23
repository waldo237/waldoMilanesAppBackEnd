const rateLimit = require('express-rate-limit');
const {
  login, register, emailConfirmation, resendVerificationToken, registerWithProvider, userIsLoggedIn,
} = require('../controllers/userController');
const { checkAccountStatus } = require('../controllers/profileController');

const accountscreatedLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    { message: 'Too actions of this type from this IP address, please try again after 24 hours.' },
});

const routes = (app) => {
  // registration route
  app.route('/auth/register').post(accountscreatedLimiter, register);
  app.route('/auth/withProvider').post(accountscreatedLimiter, checkAccountStatus, registerWithProvider);
  // login route
  app.route('/auth/login').post(checkAccountStatus, login);
  // Token Confirmation
  app.route('/auth/confirmation/:email/:id/:token').get(emailConfirmation);
  app.route('/auth/resend-vefication-token/:ssr').post(accountscreatedLimiter, resendVerificationToken);
  app.route('/auth/userIsLoggedIn').post(accountscreatedLimiter, userIsLoggedIn);
};

module.exports = routes;
