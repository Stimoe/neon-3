// const Mongoose = require("mongoose");
// const Bcrypt = require("bcryptjs");

// const UserSchema = new Mongoose.Schema({
//     username: String,
//     password: String
// });

// UserSchema.pre("save", function(next) {
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = Bcrypt.hashSync(this.password, 10);
//     next();
// });

// UserSchema.methods = {

//     getUserByUsername: function(username, callback){
//         var query = {username: username};
//         UserSchema.findOne(query, callback);
//         /*UserSchema.findOne(query, function(err, user) {
//             callback(err, user);
//         }); */
//     },



//     comparePassword: function(candidatePassword, hash, callback){
//         bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//             if(err) throw err;
//             callback(null, isMatch);
//         });
//     }
// }

// module.exports = mongoose.model('User', UserSchema);