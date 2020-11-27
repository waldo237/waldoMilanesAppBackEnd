const mongoose = require('mongoose');

const { Schema } = mongoose;

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validate: /^(dir|file)$/,
  },
  content: Object,
});
fileSchema.pre('save', function (next) {
  if (this.type === 'file') {
    this.content._id = mongoose.Types.ObjectId();
    next();
  }
});

const dirSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validate: /^(dir|file)$/,
  },
  content: [fileSchema],
});

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

exports.ProjectSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  technology: {
    type: String,
    trim: true,
    enum: ['node', 'java', 'vue', 'react'],
    required: true,
  },
  description: {
    type: String,
    trim: true,

    minlength: 5,
    maxlength: 500,
    required: true,
  },
  url: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true,
  },
  screenshot: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true,
  },
  code: {
    file: fileSchema,
    dir: [dirSchema],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rating: [{ type: String, enum: ['like', 'dislike'] }],
  comments: [CommentSchema],
});
