const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const mongouri = require('../config/mongodb');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tokens: [{type: String}],
    isActive: {type: Boolean, required: true}
});

userSchema.pre('save', function(next) {    //Mongoose middleware, performs password hashing before saving data into database
    let user = this;
    if(user.isModified('password')) {  //Check if the password is modifed, if so then only perform hasing
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;