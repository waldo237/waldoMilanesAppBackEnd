const mongoose = require('mongoose');

const { Schema } = mongoose;
const CommentSchema = new Schema({
  comment: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    trim: true,
    required: true,
  },
});

exports.articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true,
  },
  body: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true,
  },
  rating: [{ type: String, enum: ['like', 'dislike'] }],
  comments: [CommentSchema],
});
