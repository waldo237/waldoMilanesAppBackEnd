const nodemailer = require('nodemailer');
const { messageValidator } = require('./utilitites/messageValidator');

exports.emailController = (req, res) => {
  try {
    if (!messageValidator(req.body).valid) {
      return res.status(400).send({ message: messageValidator(req.body).errors.map((err) => err.message).join(', ') });
    }

    const mailOptions = {
      from: req.body.email,
      to: process.env.EMAILTO,
      subject: `Message from ${req.body.name}, sent from waldomilanes.com`,
      text: req.body.message,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    return transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'An Error has occured while sending the email', err });
      }
      return res.status(200).json({ message: 'Your Message was successfully sent' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing request.' });
  }
};
