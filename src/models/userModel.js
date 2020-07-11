const mongoose = require( 'mongoose');
const bcrypt = require( 'bcrypt');

const Schema = mongoose.Schema;

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
        required: true
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});

exports.UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
