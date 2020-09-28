const rateLimit = require('express-rate-limit');
const {
  login, register, emailConfirmation, resendVerificationToken, registerWithProvider, userIsLoggedIn,
} = require('../controllers/userController');
const { sendPasswordResetToken, confirmPasswordResetToken, enterNewPassword } = require('../controllers/passwordResetController');
const { checkAccountStatus } = require('../controllers/profileController');

const accountscreatedLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    { message: 'Too many actions of this type from this IP address, please try again after 24 hours.' },
});

const routes = (app) => {
  // registration route
  app.route('/auth/register').post(accountscreatedLimiter, register);
  app.route('/auth/withProvider').post(accountscreatedLimiter, registerWithProvider);
  // login route
  app.route('/auth/login').post(checkAccountStatus, login);
  // Token Confirmation
  app.route('/auth/confirmation/:email/:id/:token').get(emailConfirmation);

  app.route('/auth/resend-vefication-token/:ssr').post(accountscreatedLimiter, resendVerificationToken);
  app.route('/auth/userIsLoggedIn').post(accountscreatedLimiter, userIsLoggedIn);
  app.route('/auth/sendPasswordResetToken').post(accountscreatedLimiter, sendPasswordResetToken);
  app.route('/auth/confirmPasswordResetToken').post(accountscreatedLimiter, confirmPasswordResetToken);
  app.route('/auth/enterNewPassword').post(accountscreatedLimiter, confirmPasswordResetToken, enterNewPassword);
};

module.exports = routes;
