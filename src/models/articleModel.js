const mongoose = require('mongoose');

const Schema = mongoose.Schema;

exports.articleSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
        trim: true,
    },
    body:{
        type: String,
        trim: true,
        minlength: 5,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now 
     },
     photo: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
    },
})