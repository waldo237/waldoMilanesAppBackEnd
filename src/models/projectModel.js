const mongoose = require('mongoose');

const Schema = mongoose.Schema;

exports.ProjectSchema = new Schema({
    title:{
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    description:{
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
    screenshot:{
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
    },
    code:{
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
     }
})