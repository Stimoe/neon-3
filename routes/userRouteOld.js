// const mongoose = require('mongoose');
// const User = mongoose.model('users');
// const Bcrypt = require("bcryptjs");
// var BCRYPT_SALT_ROUNDS = 12;
// module.exports = (app) => {

//   app.get(`/api/user`, async (req, res) => {
//     let users = await User.find();
//     return res.status(200).send(users);
//   });



//   app.post("/api/user/register", async (request, response) => {
//     try {
//         request.body.password = Bcrypt.hashSync(request.body.password, 10);
//         var user = new User(request.body);
//         var result = await user.save();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });



// app.post("/api/user/login", async (request, response) => {
//   try {
//       var user = await User.findOne({ username: request.body.username }).exec();
//       if(!user) {
//           return response.status(400).send({ message: "The username does not exist" });
//       }
//       if(!Bcrypt.compareSync(request.body.password, user.password)) {
//           return response.status(400).send({ message: "The password is invalid" });
//       }
//       response.send({ message: "The username and password combination is correct!" });
//   } catch (error) {
//       response.status(500).send(error);
//   }
// });
















//   app.put(`/api/user/:id`, async (req, res) => {
//     const {id} = req.params;

//     let user = await User.findByIdAndUpdate(id, req.body);

//     return res.status(202).send({
//       error: false,
//       user
//     })

//   });

//   app.delete(`/api/user/:id`, async (req, res) => {
//     const {id} = req.params;

//     let user = await User.findByIdAndDelete(id);

//     return res.status(202).send({
//       error: false,
//       user
//     })

//   })

// }