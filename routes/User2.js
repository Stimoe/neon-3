var mongoose = require('mongoose'),
Bcrypt = require("bcryptjs");
User = require('../models/User2');


 module.exports = (app) => {
// create a user a new user
app.post("/api/user/register", async (request, response) => {
    try {
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
        var user = new User(request.body);
        var result = await user.save();
        response.send(result)
     
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/api/user/login", async (request, response) => {
    try {
        var user = await User.findOne({ username: request.body.username }).exec();
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" }, response.redirect('/register'));
        }
        if(!Bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(400).send({ message: "The password is invalid" }, response.redirect('/login'));
        }
        response.send({ message: "The username and password combination is correct!" });
    } catch (error) {
        response.status(500).send(error);
    }
});

 }

