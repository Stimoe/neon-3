

// var mongoose = require('mongoose'),
//   User = require('../models/User');
//   Bcrypt = require("bcryptjs");
// module.exports = (app) => {
//   // create a user a new user
//   app.post("/api/user/register", async (request, response) => {
//     try {
//       request.body.password = Bcrypt.hashSync(request.body.password, 10);
//       var user = new User(request.body);
//       var result = await user.save();
//       return response.status(200).send(result)

//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });




//   app.post('/api/user/login', function (req, res) {
//     User.findOne({ username: req.body.username }, function (err, user) {
//       if (err) throw err;
//       // res.status(400).send({ message: "The username does not exist" });
//       // test a matching password
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (err) throw err;
//         console.log(req.body.password, isMatch); // -&gt; Password123: true
//         res.status(200).send({ message: "The username and password combination is correct!" })
//       });


//     });
//   });





// }

