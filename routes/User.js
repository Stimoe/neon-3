const mongoose = require('mongoose');
const User = mongoose.model('users');
const Bcrypt = require("bcryptjs");
var BCRYPT_SALT_ROUNDS = 12;
module.exports = (app) => {

  app.post("/api/user/register", async (request, response) => {
    try {
        var user = new User(request.body);
        var result = await user.save();
        response.send(result);
        response.redirect('/storypage');
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/api/user/login", async (request, response) => {
  try {
      var user = await User.findOne({ username: request.body.username }).exec();
      if(!user) {
          return response.status(400).send({ message: "The username does not exist" }, response.redirect('/register') );
    
      }
      user.comparePassword(request.body.password, (error, match) => {
          if(!match) {
              return response.status(400).send({ message: "The password is invalid" }, response.redirect('/login'));
          }
      });
      response.send({ message: "The username and password combination is correct!" }, response.redirect('/storypage'));
  } catch (error) {
      response.status(500).send(error);
  }
});


}


