
var bcrypt = require('bcryptjs');
var User = require('../models/User');


module.exports = (app) => {

app.post('/api/user/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  const saltRounds = 10

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err
    } else {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          throw err
        } else {
          console.log(hash)
          return User.saveUser(username, hash);
        }
      })
    }
  })
 
})
}
// app.post('/api/user/login', function (req, res, next) { 
//     var username = req.body.username;
//     var password = req.body.password;
  
//     User.getUserByUsername(username)
//       .then(function(user) {
//           res.send(user)
//           bcrypt.compare(password, hash, function(err, res) {
//             // res === true
//         });
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

// const password = "mypass123"
// const saltRounds = 10
 
// bcrypt.genSalt(saltRounds, function (err, salt) {
//   if (err) {
//     throw err
//   } else {
//     bcrypt.hash(password, salt, function(err, hash) {
//       if (err) {
//         throw err
//       } else {
//         console.log(hash)
//         //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
//       }
//     })
//   }
// })









// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         return User.saveUser(username, hash);
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