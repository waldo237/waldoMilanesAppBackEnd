/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { createTransport } = require('nodemailer');
const { format } = require('url');
const { hashSync } = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const { TokenSchema, UserSchema } = require('../models/userModel');
const { passwordResetEmailInHTML } = require('./passwordResetEmailInHTML');
const { fetchPayloadFromJWT } = require('./userController');

const User = mongoose.model('User', UserSchema);
const Token = mongoose.model('Token', TokenSchema);

/**
 * @function sendPasswordResetToken
 * fetch email from body, check if it exist.
 * Send notification if email is incorrect.
 * Create a token with the email in its payload,
 * save {token, _userId} on the database for 600 seconds.
 * Send email with token, make it redirect to frontend.
 * Return confirmation
 */
exports.sendPasswordResetToken = (req, res) => {
  if (!isEmail(req.body.email)) return res.status(401).json({ message: 'bad email format.' });
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(401).json({ message: '"You have entered an invalid address"' });
      }
      const { email, _id } = user;
      // Create a verification token for this user
      const jsonToken = jwt.sign({ email }, process.env.APP_KEY);

      // save token to db
      const token = new Token({ _userId: _id, token: jsonToken });
      return token.save((tokenErr) => {
        if (tokenErr) return res.status(500).send({ message: tokenErr.message });

        //  compose URL where the email will redirect
        const passwordResetURL = format({
          host: req.headers.origin,
          pathname: '/enterNewPassword/',
          search: `${token.token}`,
        });

        //   Send the email
        const transporter = createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        const mailOptions = {
          from: process.env.EMAILFROM,
          to: email,
          subject: 'waldmilanes.com Password Reset',
          html: passwordResetEmailInHTML(passwordResetURL, user),
        };
        return transporter.sendMail(mailOptions, (error) => {
          if (error) {
            return res.status(500).send({
              message: error
                .message,
            });
          }
          return res.status(200).send({ message: `An email has been sent to ${email}.\n Please check your inbox.` });
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An  error occured while processing the data');
  }
};

/**
 * @function confirmPasswordResetToken
 * fetch a token from the body, check if it is on the database.
 * If it's not on db, return an expiration notification.
 * Check if the request came from enterNewPassword route,
 * if so, pass on next(), else return confirmation.
 */
exports.confirmPasswordResetToken = (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      return Token.findOne({ token }, (err, item) => {
        if (err) throw err;
        if (!item) {
          return res.status(498).json({
            message: `Your request/token for this operation has expired
         or has already been used. Please start the process again.`,
            link: { label: 'Request another token', href: '/PasswordReset' },
          });
        }
        if (req.originalUrl === '/auth/enterNewPassword') return next();
        return res.status(200).json({ message: 'ready to go!' });
      });
    }
    return res.status(400).json({ message: 'You are missing essential information in your request' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'An  error occured while processing the data' });
  }
};

/**
 * @function confirmPasswordResetToken
 * fetch email from token payload.
 * create a hashed password
 * Make an update on the user's password.
 * if not successful return notification.
 * remove token because it has been used already.
 * Return confirmation asking the user to log again.
 */
exports.enterNewPassword = (req, res) => {
  try {
    const { token, password } = req.body;
    if (!password) return res.status(404).json({ message: 'Missing password.' });
    if (token) {
      const { email } = fetchPayloadFromJWT(token);
      const hashPassword = hashSync(password, 10);
      // get the IP address from where the modification was made
      const IP = req.connection.remoteAddress
        || req.headers['x-forwarded-for']
        || req.socket.remoteAddress
        || (req.connection.socket ? req.connection.socket.remoteAddress : null);

      const isPasswordModified = {
        hasBeendModified: true,
        IP,
        date: Date.now(),
      };
      User.updateOne({ email }, { hashPassword, isPasswordModified },
        { runValidators: true, new: true },
        (error, updatedUser) => {
          if (error) throw error;
          if (updatedUser && updatedUser.nModified) {
            Token.deleteOne({ token }, (err, deletedItem) => {
              if (err) throw err;
              return (deletedItem.n)
                ? res.status(200).json({ message: 'The password was modified correctly. Please sign in.', link: { label: 'Sign in', href: '/followers' } })
                : res.status(404).json({ message: 'The update did not take effect.' });
            });
          }
        });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'An  error occured while processing the data' });
  }
};
