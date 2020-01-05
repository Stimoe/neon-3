const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extend: true }));

Mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/neon-rain`);

const UserModel = new Mongoose.model("user", {
    username: String,
    password: String
});

app.post("/api/user/register", async (request, response) => {
    try {
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
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
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" });
        }
        if(!Bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(400).send({ message: "The password is invalid" });
        }
        response.send({ message: "The username and password combination is correct!" });
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/dump", async (request, response) => {
    try {
        var result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  });