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
 * @function register(), if the user already exists on the database, he will be sent a token
 * to use it on the header everytime he sents a request to signal that he is logged in.
 * 
 */
exports.register = async (req, res) => {
    
    try {
        // define boolean if already exists.
        let alreadyExists =  await User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            if (!user) return null
        });
    
        // if the user already exists you will call loginFunc
        if (alreadyExists) {
            // console.log("loggedin", alreadyExists)
            return loginFunc(req, res);
        } else {
            console.log("registered")
            const newUser = new User(req.body);
            newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
            //   chain reacction
            await newUser.save((err, user) => {
                if (err) {
                    console.log(err.message)
                    return res.status(400).send({ message: 'There was an issue with your request.' });
                }
                return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user.id }, process.env.APP_KEY) });
            })
        } 
    } catch (error) {
        console.log(error)
    }
}

const loginFunc = (req, res) => {
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.status(401).json({ message: 'Authentication failed. No user found' });
            } else if (user && req.body.password) {
                if (!user.comparePassword(req.body.password, user.hashPassword)) {
                    res.status(401).json({ message: 'Authentication failed. Wrong password' });
                } else {
                    return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user.id }, process.env.APP_KEY) });
                }
            }else{
                res.status(401).json({ message: 'Authentication failed. Wrong password' });
            }
        });

    } catch (error) {
        console.log(error);
    }

}