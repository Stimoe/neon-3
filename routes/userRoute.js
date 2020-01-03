
Bcrypt = require("bcryptjs");

var mongoose = require(mongoose),
    User = require('../models/User');

 module.exports = (app) => {
// create a user a new user
app.post("/api/user/register", async (request, response) => {
    try {
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
        var user = new User(request.body);
        var result = await user.save();
        return response.status(200).send(result)
     
    } catch (error) {
        response.status(500).send(error);
    }
});

// app.post("/api/user/login", async (request, response) => {
//     try {
//         var user = await User.findOne({ username: request.body.username }).exec();
//         // response.send(user)
//         if(!user) {
//             return response.status(400).send({ message: "The username does not exist" });
//         }
//         if(!Bcrypt.compareSync(request.body.password, user.password)) {
//             return response.status(400).send({ message: "The password is invalid" });
//         }
//         if(Bcrypt.compareSync(request.body.password, user.password)) {
//             return response.status(200).send({ message: "The username and password combination is correct!" });
//         }
//         // response.send({ message: "The username and password combination is correct!" });
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// app.post('/api/user/login', function (req, res) {
//     User.findOne({
//          where: {
//              username: req.body.username
//                 }
//     }).then(function (user) {
//         res.send(user)
//         if (!user) {
//            res.status(400).send({ message: "The username does not exist" });;
//         } else {
// Bcrypt.compare(req.body.password, user.password, function (err, result) {


//        if (result == true) {
//            res.status(200).send({ message: "The username and password combination is correct!" })
//        } else {
//         res.send('Incorrect password');
//         res.status(400).send({ message: "The password is invalid" });
//        }
//      });
//     }
//  });
// });

app.post('/api/user/login', function (req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) throw err;
    res.status(400).send({ message: "The username does not exist" });
    // test a matching password
    user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        console.log(req.body.password, isMatch); // -&gt; Password123: true
        res.status(200).send({ message: "The username and password combination is correct!" })
    });

    // test a failing password
    // user.comparePassword('123Password', function(err, isMatch) {
    //     if (err) throw err;
    //     console.log('123Password:', isMatch); // -&gt; 123Password: false
    // });
});
});





 }

