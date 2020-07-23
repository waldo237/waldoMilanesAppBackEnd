
const { login, register, emailConfirmation, resendVerificationToken} = require ('../controllers/userController');
const rateLimit = require("express-rate-limit");

const accountscreatedLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    {successful: false, message: "Too many accounts created from this IP address, please try again after 24 hours."}
});

const routes = (app) => {
    // registration route
    app.route('/auth/register').post(accountscreatedLimiter, register);
    // login route
    app.route('/auth/login').post(login);
    //Token Confirmation
    app.route('/auth/confirmation/:email/:id/:token').get(emailConfirmation);
    app.route('/auth/resend-vefication-token/:ssr').post(accountscreatedLimiter, resendVerificationToken);
}

module.exports = routes; 