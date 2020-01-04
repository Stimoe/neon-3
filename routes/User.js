
var mongoose = require('mongoose'),
UserModel = require('../models/User2');
Bcrypt = require("bcryptjs");
module.exports = (app) => {

    app.post("/api/user/register", async (request, response) => {
        try {
            var user = new UserModel(request.body);
            var result = await user.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.post("/api/user/login", async (request, response) => {
        try {
            var user = await UserModel.findOne({ username: request.body.username }).exec();
            response.send({ user })
            if(!user) {
                return response.status(400).send({ message: "The username does not exist" });
            }
            user.comparePassword(request.body.password, (error, match) => {
                if(!match) {
                    return response.status(400).send({ message: "The password is invalid" });
                }
            });
            response.send({ message: "The username and password combination is correct!" });
        } catch (error) {
            response.status(500).send(error);
        }
    });


}