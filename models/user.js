const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, '1235');
    return token
}


const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required()
    })
    return schema.validate(user);
}


exports.User = User;
exports.validateUser = validateUser;
