const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const mongouri = require('../config/mongodb');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
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

userSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err, false);
      }
      return cb(null, isMatch);
    });
  };

//   userSchema.methods.comparePassword = function (candidatePassword, hash, callback) {
//     bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
//         if (err) throw err;
//         callback(null, isMatch);
//     });
// }


const User = mongoose.model('user', userSchema);

module.exports = User;



// userSchema.pre('save', function(next) {
//     // only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) {
//       return next();
//     }
//     // generate a salt
//     return bcrypt.genSalt(10, function(error, salt) {
//       if (error) {
//         return next(error);
//       }
  
//     // hash the password using the new salt
//       return bcrypt.hash(this.password, salt, function(error, hash) {
//         if (error) {
//           return next(error);
//         }
//         // override the cleartext password with the hashed one
//         this.password = hash;
//         return next();
//       });
//     });
//   });
  
  
//   userSchema.methods.comparePassword = function(passw, cb) {
//     bcrypt.compare(passw, this.password, function(err, isMatch) {
//       if (err) {
//         return cb(err, false);
//       }
//       return cb(null, isMatch);
//     });
//   };