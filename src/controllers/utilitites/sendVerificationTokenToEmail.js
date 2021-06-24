const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { verificationEmailInHTML } = require('./verificationEmailInHTML');
const { Token } = require('../userController');

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
exports.sendVerificationTokenToEmail = sendVerificationTokenToEmail;
