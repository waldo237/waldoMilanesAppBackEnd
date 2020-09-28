/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { UserSchema, TokenSchema } = require('../models/userModel');
const { verificationEmailInHTML } = require('./verificationEmailInHTML');

const User = mongoose.model('User', UserSchema);
const Token = mongoose.model('Token', TokenSchema);

/**
 * @function login confirm that the user data is valid and send a token if it does.
 */
const login = (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. "You have entered an invalid username or password"' });
      } if (user && req.body.password) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          return res.status(401).json({ message: 'Authentication failed. "You have entered an invalid username or password"' });
        }
        // Make sure the user has been verified
        if (!user.isVerified) {
          return res.status(401).send({
            type: 'not-verified',
            message: 'Your account has not been verified. Please check your inbox or',
            link: { label: 'Send another email', href: `http://${req.headers.host}/auth/resend-vefication-token/false` },
          });
        }

        return res.status(200).json({
          message: 'You have successfully logged in.',
          token: jwt.sign(
            { hashed_access: bcrypt.hashSync(user.email, 5), email: user.email, _id: user._id },
            process.env.APP_KEY,
          ),
        });
      }
      res.status(401).json({ message: 'Authentication failed. "You have entered an invalid username or password"' });
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @function directLoginWithProvider() return a JWT
 */
const directLoginWithProvider = (req, res, next, user) => {
  res.status(200).json({
    message: 'You have successfully logged in.',
    token: jwt.sign(
      { hashed_access: bcrypt.hashSync(user.email, 5), email: user.email, _id: user._id },
      process.env.APP_KEY,
    ),
  });
  return next();
};
/**
 * @function sendVerificationTokenToEmail Create a verification token for this user,
 * save token, Send the email
 * @param {*} req
 * @param {*} res
 * @param {*} user
 */
const sendVerificationTokenToEmail = (req, res, user) => {
  // Create a verification token for this user
  const jsonToken = jwt.sign({
    hashed_access: bcrypt.hashSync(user.email, 5),
    email: user.email,
  }, process.env.APP_KEY);
  // eslint-disable-next-line no-underscore-dangle
  const token = new Token({ _userId: user._id, token: jsonToken });

  // save token
  token.save((err) => {
    if (err) return res.status(500).send({ message: err.message });
    // Send the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAILFROM,
      to: user.email,
      subject: 'Account Verification Token',
      html: verificationEmailInHTML(req.headers.host, user, token.token),
    };
    return transporter.sendMail(mailOptions, (error) => {
      const serverSideRendered = req.params.ssr === 'true';
      if (error) {
        return (serverSideRendered)
          ? res.status(500).render('index', { successful: false, message: error.message })
          : res.status(500).send({ message: error.message });
      }
      return (serverSideRendered)
        ? res.status(200).render('index', { successful: true, message: `A verification email has been sent to ${user.email}.` })
        : res.status(200).send({ message: `A verification email has been sent to ${user.email}.` });
    });
  });
};

/**
 * @function loginRequired(), middleware that confirms that req.user exists,
 * otherwise sends a response message with 'Unauthorized user!'.
 */
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: 'Unauthorized user!' });
  }
};

/**
 * @function register
 * register user to database if email is unique.
 * if hasIdByProvider the email is verified immediately
 * and the user is signed in/a new token is sent.
 * else send email with token and return a notification message.
 */
const register = async (req, res, next) => {
  try {
    // define boolean if already exists.
    const alreadyExists = await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (user) return true;
    });

    if (alreadyExists) {
      return res.status(401).json({ message: 'Email already taken.' });
    }
    console.log(req.body)
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    // verify user if has a valid id from a provider
    const hasIdByProvider = req.body.cu_id && req.originalUrl === '/auth/withProvider';
    if (hasIdByProvider) newUser.isVerified = true;
    newUser.save((err, user) => {
      if (err) return res.status(500).send({ message: 'There was an issue with your request. Please try again.' });
      if (hasIdByProvider) return directLoginWithProvider(req, res, next, user);

      return sendVerificationTokenToEmail(req, res, user);
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @function registerWithProvider
 * search user on database
 * use the cu_id as password
 * if the user already exist, the email and cu_id will be used to signIn ---> signin function.
 * else a new user is created using the credentials sent ---> register route
 */
exports.registerWithProvider = async (req, res, next) => {
  try {
    const alreadyExists = await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (user) return true;
    });
    req.body.password = await req.body.cu_id;

    if (alreadyExists) {
      return login(req, res);
    }
    return register(req, res, next);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @function resendTokenPost gets called if user wants to receive a token one more time.
 */
exports.resendVerificationToken = async (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(400).send({ message: 'We were unable to find a user with that email.' });
      if (user.isVerified) {
        return (req.params.ssr)
          ? res.status(400).render('index', { message: 'This account has already been verified. Please log in.' })
          : res.status(400).send({ message: 'This account has already been verified. Please log in.' });
      }
      sendVerificationTokenToEmail(req, res, user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An  error occured while fetching the data');
  }
};

const verifyUser = (req, res) => {
  try {
    User.findOne({ _id: req.params.id, email: req.params.email }, (err, user) => {
      if (!user) return res.status(400).render('index', { successful: false, type: 'user-not-found', message: 'We were unable to find a user for this token.' });
      if (user.isVerified) {
        return res.status(200).render('index', {
          successful: true, type: 'already-verified', message: 'This account has already been verified.', link: 'https://waldomilanes.com/followers',
        });
      }

      // Verify and save the user
      // eslint-disable-next-line no-param-reassign
      user.isVerified = true;
      user.save((error) => {
        if (error) return res.status(500).render('index', { successful: false, message: err.message });
        return res.status(200).render('index', { successful: true, message: 'The account has been verified', link: 'https://waldomilanes.com/followers' });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const assertion = (params) => {
  const errors = [];
  // eslint-disable-next-line global-require
  const isEmail = require('validator/lib/isEmail');
  if (!params.email) errors.push('Email cannot be blank');
  if (!params.id) errors.push('id cannot be blank');
  if (!params.token) errors.push('Token cannot be blank');
  if (!isEmail(params.email)) errors.push('Email is not valid');
  return errors;
};
/**
 * @returns render with instructions
 * @function emailConfirmation Handle  token once user is redirected from their inbox.
 */
exports.emailConfirmation = (req, res) => {
  // Check for validation errors
  const errors = assertion(req.params);
  if (errors.length) return res.status(400).render('index', { successful: false, type: 'not-verified', message: errors });

  // Find a matching token
  Token.findOne({ token: req.params.token }, (err, token) => {
    try {
      if (err) throw err;
      if (!token) {
        return User.findOne({ email: req.params.email }, (error, user) => {
          if (error) throw error;
          if (user) { // check that the user is valid and offer to resend token
            return res.status(401).render('index', {
              successful: false,
              type: 'expired-token',
              resend: true,
              user,
              message: 'We were unable to find a valid token. Your token might have expired.',
            });
          }
          return res.status(401).render('index', {
            successful: false,
            type: 'expired-token',
            message: 'We were unable to find a valid token. Your token might have expired.',
          });
        });
      }
      // If we found a token, find a matching user
      verifyUser(req, res, true);
    } catch (error) {
      return res.status(500).send('There was an issue while processing your request, please verify the data and try again.');
    }
  });
};

/**
 * @function fetchPayloadFromJWT it receives JWT token, fetches payload and returns it
 * @param token a valid  JWT token
 */
const fetchPayloadFromJWT = (token) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

/**
 * @function userIsLoggedIn
 *  it receives JWT token, fetches payload --> hashed_access and email,
 *  compares it against hashing algorithm
 *  send it back with code401 or code200
 */
exports.userIsLoggedIn = (req, res) => {
  try {
    const { token } = req.body;
    const pL = (token) ? fetchPayloadFromJWT(token) : null;
    const comparisonPassed = bcrypt.compareSync(pL.email, pL.hashed_access);

    if (comparisonPassed) {
      return res.status(200).json(`${pL.hashed_access}code200`);
    }
    return res.status(401).json(`${pL.hashed_access}code401`);
  } catch (error) {
    return res.status(500).send('There was an issue while processing your request, please verify the data and try again.');
  }
};

// declared exports
exports.login = login;
exports.register = register;
exports.fetchPayloadFromJWT = fetchPayloadFromJWT;
