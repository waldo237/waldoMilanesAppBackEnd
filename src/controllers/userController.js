const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserSchema } = require( '../models/userModel');

const User = mongoose.model('User', UserSchema);

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns a token
 * @function register(), if the user already exists on the database, the client will be sent a token
 * to use it on the header everytime he sents a request to signal that the client is logged in.
 * 
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
            return res.json({alreadyExists: true});
        } else {
            const newUser = new User(req.body);
            newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
            //Save user to DB and send a jwt
            await newUser.save((err, user) => {
                if (err) {  //handle errors
                    console.log(err.message)
                    return res.status(400).send({ message: 'There was an issue with your request.' });
                }
                return res.json({ token: jwt.sign({ email: user.email,  _id: user.id }, process.env.APP_KEY)});
            })
        } 
    } catch (error) {
        console.log(error)
    }
}

exports.loginFunc = (req, res) => {
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.status(401).json({ message: 'Authentication failed. No user found' });
            } else if (user && req.body.password) {
                if (!user.comparePassword(req.body.password, user.hashPassword)) {
                    res.status(401).json({ message: 'Authentication failed. Wrong password' });
                } else {
                    return res.json({ token: jwt.sign({ email: user.email, _id: user.id }, process.env.APP_KEY) });
                }
            }else{
                res.status(401).json({ message: 'Authentication failed. Wrong password' });
            }
        });

    } catch (error) {
        console.log(error);
    }

}