const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserSchema, TokenSchema } = require("../models/userModel");
const nodemailer = require("nodemailer");
const { verificationEmailInHTML } = require("./verificationEmailInHTML");
const User = mongoose.model("User", UserSchema);
const Token = mongoose.model("Token", TokenSchema);

/**
 * @function loginRequired(), middleware that confirms that req.user exists, otherwise sends a response message with 'Unauthorized user!'.
 */
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ successful: false, message: "Unauthorized user!" });
  }
};

/**
 * @returns message notification that an email has been sent.
 * @function register(), if the email already exist in the database, the client will be sent a notification:boolean
 * to ask the user to use a different email address.
 */
exports.register = async (req, res) => {
  try {
    // define boolean if already exists.
    let alreadyExists = await User.findOne(
      { email: req.body.email },
      (err, user) => {
        if (err) throw err;
        if (user) return true;
      }
    );

    // if the user already exists, send an object to the client for it to reroute to the correct function
    if (alreadyExists) {
      return res.json({ successful: false, message: "Email already taken." });
    } else {
      const newUser = new User(req.body);
      newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  
      await newUser.save((err, user) => {
        if (err) return res.status(500)
          .send({successful: false, message: "There was an issue with your request. Please try again.",});
      
        sendVerificationTokenToEmail(req, res, user);
      });
    }
  } catch (error) {
    console.log(error);
  }
};


/**
 * @function resendTokenPost(), gets called if user wants to receive vefirification token one more time.
 */
exports.resendVerificationToken = async (req, res) => {

  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
     
      sendVerificationTokenToEmail(req,res, user)

    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An  error occured while fetching the data');
  }
};


/**
 * @returns JWT Token
 * @function login(), confirm that the user data is valid and send a token if it does.
 */
exports.login = (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(401).json({
          message:
            'Authentication failed. "You have entered an invalid username or password"',
        });
      } else if (user && req.body.password) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res.status(401).json({
            message:
              'Authentication failed. "You have entered an invalid username or password"',
          });
        } else {
          // Make sure the user has been verified
          if (!user.isVerified)
            return res.status(401).send({
              type: "not-verified",
              successful: false,
              message: "Your account has not been verified. Please check your inbox or",
              link: {label:'Send another email', href:`http://${req.headers.host}/auth/resend-vefication-token/`}
            });

          return res.json({
            successful: true,
            message: "You have successfully logged in.",
            token: jwt.sign(
              { email: user.email, _id: user.id },
              process.env.APP_KEY
            ),
          });
        }
      } else {
        res.status(401).json({
          message:
            'Authentication failed. "You have entered an invalid username or password"',
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @returns render with instructions
 * @function emailConfirmation(), Handle verification token once user is redirected after clicking link from their inbox.
 */
exports.emailConfirmation = (req, res, next) => {
  // Check for validation errors    
  var errors = assertion(req.params);
  if (errors.length) return res.status(400).render('index', { successful: false, type: 'not-verified', message: errors })

  // Find a matching token
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) return res.status(400).render('index', { successful: false, type: 'not-verified', message: 'We were unable to find a valid token. Your token might have expired.' });

    // If we found a token, find a matching user
    User.findOne({ _id: req.params.id, email: req.params.email }, function (err, user) {
      if (!user) return res.status(400).render('index', { successful: false, type: 'user-not-found', message: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).render('index', { successful: true, type: 'already-verified', message: 'This account has already been verified.', link: 'https://waldomilanes.com/supporters' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) { return res.status(500).render('index', { successful: false, message: err.message }); }
        res.status(200).render('index', { successful: true, message: "The account has been verified", link: 'https://waldomilanes.com/supporters' });
      });
    });
  });
};


const assertion = (params) => {
  let errors = [];
  const isEmail = require('validator/lib/isEmail');
  if (!params.email) errors.push('Email cannot be blank')
  if (!params.id) errors.push('id cannot be blank')
  if (!params.token) errors.push('Token cannot be blank')
  if (!isEmail(params.email)) errors.push('Email is not valid');
  return errors
}

const sendVerificationTokenToEmail = (req, res, user)=>{
  // Create a verification token for this user
  const jsonToken = jwt.sign( { email: user.email, _id: user._id },process.env.APP_KEY );
  const token = new Token({ _userId: user._id, token: jsonToken });
 
  // save token
  token.save(function (err) {
    if (err) return res.status(500).send({ successful: false, message: err.message });
    // Send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAILFROM,
      to: user.email,
      subject: "Account Verification Token",
      html: verificationEmailInHTML(req.headers.host, user, token.token),
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        return res
          .status(500)
          .send({ successful: false, message: err.message });
      }
      return res.status(200).send({
        successful: true,
        message: `A verification email has been sent to ${user.email}.`,
      });
    });
  });
}