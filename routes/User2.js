
// var bcrypt = require('bcryptjs');
// var User = require('../models/User');
// var BCRYPT_SALT_ROUNDS = 12;

// module.exports = (app) => {

// app.post('/api/user/register', function (req, res, next) {
//   var username = req.body.username;
//   var password = req.body.password;

//   bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
//     .then(function(hashedPassword) {
//         return User.saveUser(username, hashedPassword);
//     })
//     .then(function() {
//         res.send();
//     })
//     .catch(function(error){
//         res.send("Error saving user: ");
//         res.send(error);
//         next();
//     });
// });

// app.post('/api/user/login', function (req, res, next) { 
//     var username = req.body.username;
//     var password = req.body.password;
  
//     User.getUserByUsername(username)
//       .then(function(user) {
//           return bcrypt.compare(password, user.password);
//       })
//       .then(function(samePassword) {
//           if(!samePassword) {
//               res.status(403).send();
//           }
//           res.send();
//       })
//       .catch(function(error){
//           res.send("Error authenticating user: ");
//           res.send(error);
//           next();
//       });
//   });

// }