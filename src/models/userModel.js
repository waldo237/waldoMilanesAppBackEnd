/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

exports.UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,

  },
  hashPassword: {
    type: String,
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line max-len
exports.UserSchema.methods.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
exports.TokenSchema = new Schema({
  token: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expireAfterSeconds: 600 },
  },
});
