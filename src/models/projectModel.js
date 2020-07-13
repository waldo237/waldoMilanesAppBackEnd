const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        validate: /^(dir|file)$/
    }, 
    content: String
})

const dirSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        validate: /^(dir|file)$/
    },
    content: [fileSchema]
})


exports.ProjectSchema = new Schema({
    title:{
        type: String, 
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    technology:{
        type: String,
        trim: true,
       enum:['node','java', 'vue', 'react'],
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
    code:{file:fileSchema,
        dir:[dirSchema] 
    },
    date: {
        type: Date,
        default: Date.now 
     }
})