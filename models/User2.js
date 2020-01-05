const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
 username: {
  type: String,
  trim: true,  
  required: true,
 },
 password: {
  type: String,
  trim: true,
  required: true
 }
});






userSchema.methods.createUser = function(newUser, callback){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }
    userSchema.methods.getUserByUsername = function(username, callback){
        var query = {username: username};
        User.findOne(query, callback);
    }
  
    userSchema.methods.comparePassword = function(candidatePassword, hash, callback){
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err) throw err;
            callback(null, isMatch);
        });
    }





module.exports = mongoose.model('User', userSchema);







// module.exports.createUser = function(newUser, callback){
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(newUser.password, salt, function(err, hash) {
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// }

// module.exports.getUserByUsername = function(username, callback){
//     var query = {username: username};
//     User.findOne(query, callback);
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//     bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }