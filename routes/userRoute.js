const mongoose = require('mongoose');
const User = mongoose.model('users');
var bcrypt = require('bcryptjs');
var BCRYPT_SALT_ROUNDS = 12;
module.exports = (app) => {

  app.get(`/api/user`, async (req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
  });

  app.post(`/api/user/register`, async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
console.log(username);
console.log(password);



    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
   
    
    .then(function(hashedPassword) {
      console.log(hashedPassword);
        return User.saveUser(username, hashedPassword);
    })
    .then(function() {
        res.send(User);
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        next();
    });


    // let user = await User.create(req.body);
    // return res.status(201).send({
    //   error: false,
    //   user
    // })
  })

  app.post('/api/user/login', function (req, res, next) { 
    var username = req.body.username;
    var password = req.body.password;
  
    User.getUserByUsername(username)
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

















  app.put(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      user
    })

  });

  app.delete(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      user
    })

  })

}