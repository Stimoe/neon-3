const mongoose = require('mongoose');

// const mongouri = require('../config/mongodb');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    hash: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    winCount: {
        type: Number,
    },
    userDeck: {
        currentDeck:  [{}]
    }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;





