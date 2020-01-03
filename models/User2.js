const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");


const UserSchema = new Mongoose.Schema({
    username: String,
    password: String
});


UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

// const User = new Mongoose.model("user", UserSchema);

module.exports = Mongoose.model('User', UserSchema);