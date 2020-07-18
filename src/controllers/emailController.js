
const nodemailer = require('nodemailer');
const isEmail = require('validator/lib/isEmail');
const escape = require('validator/lib/escape');

exports.emailController = (req, res) => {
    try {
        if (!messageValidator(req.body).valid) {
            return res.status(400).send({ successful: false, message: messageValidator(req.body).errors.map((err) => err.message).join(", ") })
        }

        let mailOptions = {
            from: req.body.email,
            to: process.env.EMAILTO,
            subject: `Message from ${req.body.name}, sent from waldomilanes.com`,
            text: req.body.message
        };

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL || 'abc@gmail.com',
                pass: process.env.PASSWORD || '1234'
            }
        });
  
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return res.json({ successful: false, message: 'An Error has occured while sending the email' })
            }
            return res.json({ successful: true, message: 'Your Message was successfully sent' })
        });
    } catch (error) {
        return res.status(500).json({ successful: false, message: 'Error processing request.' })
    }

}



const messageValidator = (user) => {
    let responseObject = {
        valid: true,
        errors: []
    }

    if (!user.name) {
        responseObject.errors.push({ type: 'name', message: "Please do not forget include your name." });
        responseObject.valid = false;
    } else if (user.name.length < 3) {
        responseObject.errors.push({ type: 'name', message: "The name should be longer than 3 characters." });
        responseObject.valid = false;
    }

    if (!user.email) {
        responseObject.errors.push({ type: 'email', message: "Please do not forget to include your email address." });
        responseObject.valid = false;
    } else if (!isEmail(user.email)) {
        responseObject.errors.push({ type: 'email', message: "The email your provided is not correct." });
        responseObject.valid = false;
    }

    if (!user.message) {
        responseObject.errors.push({ type: 'message', message: "Please do not forget to include your message." });
        responseObject.valid = false;
    } else if (user.message.length < 15) {
        responseObject.errors.push({ type: 'message', message: "The message should be longer than 15 characters." });
        responseObject.valid = false;
    }

    if (responseObject.valid) {
        responseObject.sanitized = {
            name: escape(user.name.trim()),
            email: escape(user.email.trim()),
            message: escape(user.message.trim())
        }
    }

    return responseObject
}