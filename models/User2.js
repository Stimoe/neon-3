var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // bcrypt = require('bcryptjs'),
    // SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});



module.exports = mongoose.model('User', UserSchema);