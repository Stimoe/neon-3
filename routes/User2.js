
var bcrypt = require('bcrypt');
var usersDB = require('../models/User');

module.exports = (app) => {

var BCRYPT_SALT_ROUNDS = 12;
app.post('/api/user/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
        return usersDB.saveUser(username, hashedPassword);
    })
    .then(function() {
        res.send();
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        next();
    });
});

app.post('/api/user/login', function (req, res, next) { 
    var username = req.body.username;
    var password = req.body.password;
  
    usersDB.getUserByUsername(username)
      .then(function(user) {
          return bcrypt.compare(password, user.password);
      })
      .then(function(samePassword) {
          if(!samePassword) {
              res.status(403).send();
          }
          res.send();
      })
      .catch(function(error){
          console.log("Error authenticating user: ");
          console.log(error);
          next();
      });
  });

}