
// const bcrypt = require("bcryptjs");

// const userSchema = require("../models/User");

// module.exports = (app) => {
// // Sign-up
// app.post("/api/user/register", (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then((hash) => {
//         const user = new userSchema({
//             username: req.body.username,
//             password: hash
//         });
//         user.save().then((response) => {
//             res.status(201).json({
//                 message: "User successfully created!",
//                 result: response
//             });
//         }).catch(error => {
//             res.status(500).json({
//                 error: error
//             });
//         });
//     });
// });

// app.post("/api/user/login", (req, res, next) => {
//   let getUser;
//   userSchema.findOne({
//       username: req.body.username
//   }).then(user => {
//       if (!user) {
//           return res.status(401).json({
//               message: "Authentication failed, No user by that name"
//           });
//       }
//       return bcrypt.compare(req.body.password, user.password);
//   }).then(response => {
//       if (!response) {
//           return res.status(401).json({
//               message: "Authentication failed, wrong password"
//           });
//       }
//       res.send("Correct!!")
//   }).catch(err => {
//       return res.status(401).json({
//           message: "Authentication failed"
//       });
//   });
// });
// }