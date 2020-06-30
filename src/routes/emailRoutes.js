
const nodemailer = require('nodemailer');

const routes = (app) => {
    app.post('/email', (req, res) => {

        let mailOptions = {
            from: req.body.email,
            to: process.env.EMAILTO, 
            subject: `Message from ${req.body.name} sent from waldomilanes.com`,
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
              return  res.json({ successful: false, message: 'An Error has occured while sending the email' })
            }
           return  res.json({ successful: true, message: 'Your Message was successfully sent' })
        });
    })
}

module.exports = routes;
