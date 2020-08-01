const rateLimit = require('express-rate-limit');
const { emailController } = require('../controllers/emailController');

const sentEmailsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3, // start blocking after 5 requests
  message:
    { message: 'Too many emails sent from this IP, please try again after an hour.' },
});

const routes = (app) => {
  app.post('/email', sentEmailsLimiter, emailController);
};

module.exports = routes;
