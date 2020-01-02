const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
})

mongoose.model('users', userSchema);

User.beforeCreate(function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });