/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UserSchema } = require('../models/userModel');
const { fetchPayloadFromJWT } = require('./userController');

const User = mongoose.model('User', UserSchema);

/**
 * @function authenticateToMakeChanges prevent users from making changes to someone's profile.
 * Check if the payload in the token is valid, compare it against the email field, confirm that
 * there's a user with that id and email.
 */
exports.authenticateToMakeChanges = (req, res, next) => {
  try {
    req.body._id = mongoose.Types.ObjectId(req.params.id);
    const { email, _id } = req.body;
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT')
      ? req.headers.authorization.split(' ')[1] : '';
    const pL = (token) ? fetchPayloadFromJWT(token) : null;
    const comparisonPassed = bcrypt.compareSync(email, pL.hashed_access);

    User.findOne({ _id, email }, (err, user) => {
      if (err) throw err;
      if (!user || !comparisonPassed || pL.email !== email) {
        return res.status(401).json({
          message: `Authentication failed.
          You are not authorized to access or edit this profile. Check if you are properly logged in.`,
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};
/**
 * @function retrieveProfile get information about a user using the uid.
 */
exports.retrieveProfile = (req, res) => {
  const { _id } = req.body;
  User.findOne({ _id }, { hashPassword: 0, isVerified: 0 }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        message: 'This account has been canceled. If want to use this service, you may create another account.',
      });
    }
    res.status(200).json(user);
  });
};
/**
 * @function updateProfile allow users to update their profile {firstName, lastName, photoURL}.
 */
exports.updateProfile = (req, res) => {
  try {
    const {
      firstName, lastName, photoURL, _id,
    } = req.body;
    User.updateOne({ _id }, { firstName, lastName, photoURL },
      { runValidators: true, new: true },
      (error, updatedUser) => ((updatedUser && updatedUser.nModified)
        ? res.status(200).json({ message: 'The user was modified correctly.' })
        : res.status(404).json({ message: 'The update did not take effect.' })));
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function deleteProfile allow the user to change the status {active/inactive} of the account
 */
exports.deleteProfile = async (req, res) => {
  try {
    const { _id } = req.body;
    User.updateOne({ _id }, { acccountStatus: 'inactive' },
      { runValidators: true, new: true }, (error, updatedUser) => {
        if (error) throw error;
        return (updatedUser.nModified)
          ? res.status(200).json({ message: 'Your account has been canceled, you will no longer have access to it.' })
          : res.status(404).json({ message: 'There was an issue while trying to cancel account.' });
      });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function checkAccountStatus find user by email
 * verify if the accountStatus is (active | inactive)
 * if inactive, notify the user, otherwise call next
 */
exports.checkAccountStatus = (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(401).json({ message: 'There is not user with this description' });
      if (user.acccountStatus === 'inactive') {
        return res.status(401).json({
          message: 'This account has been canceled. If want to use this service, you may create another account.',
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};
