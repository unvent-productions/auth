var mongoose = require('mongoose');
var { Schema } = mongoose;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
});

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 10);
    }

    next();
});

var User = mongoose.model('User', UserSchema, 'users');
module.exports = User;