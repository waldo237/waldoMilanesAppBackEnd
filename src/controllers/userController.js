const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserSchema } = require( '../models/userModel');

const User = mongoose.model('User', UserSchema);

/**
 * @function loginRequired(), middleware that confirms that req.user exists, otherwise sends a response message with 'Unauthorized user!'.
 */
exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({successful: false, message: 'Unauthorized user!' });
    }
}

/**
 * @returns boolean
 * @function register(), if the email already exist in the database, the client will be sent a notification:boolean
 * to ask the user to use a different email address.
 */
exports.register = async (req, res) => {
    try {
        // define boolean if already exists.
        let alreadyExists =  await User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            if (user) return true
        });
    
        // if the user already exists, send an object to the client for it to reroute to the correct function
        if (alreadyExists) {
            console.log("loggedin", 'alreadyExists')
            return res.json({ successful: false, message: 'Email already taken.' })
        } else {
            const newUser = new User(req.body);
            newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
            //Save user to DB and send a jwt
            await newUser.save((err, user) => {
                if (err) {  //handle errors
                    console.log(err.message)
                    return res.status(400).send({successful: false, message: 'There was an issue with your request. Please try again.' });
                }
                return res.json({successful: true,  message: 'You have successfully logged in.', token: jwt.sign({ email: user.email,  _id: user.id }, process.env.APP_KEY)});
            })
        } 
    } catch (error) {
        console.log(error)
    }
}
/**
 * @returns JWT Token
 * @function register(), confirm that the user data is valid and send a token if it does.
 */
exports.login = (req, res) => {
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.status(401).json({ message: 'Authentication failed. "You have entered an invalid username or password"' });
            } else if (user && req.body.password) {
                if (!user.comparePassword(req.body.password, user.hashPassword)) {
                    res.status(401).json({ message: 'Authentication failed. "You have entered an invalid username or password"' });
                } else {
                    return res.json({successful: true,  message: 'You have successfully logged in.', token: jwt.sign({ email: user.email, _id: user.id }, process.env.APP_KEY) });
                }
            }else{
                res.status(401).json({ message: 'Authentication failed. "You have entered an invalid username or password"' });
            }
        });

    } catch (error) {
        console.log(error);
    }

}