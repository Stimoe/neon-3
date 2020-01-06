// var bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');
// const userModel = require('./models/User');
// const mongouri = (process.env.MONGODB_URI || `mongodb://localhost:27017/neon-rain`)

// const secret_key = "thats_really_a_secret";  // enter your secret key here for signing JWT
// module.exports = (app) => {




// const authenticate = async (req, res, next) => {  //The authenticate middleware
//     let token = req.header('x-auth');
//     try {
//         decoded = jwt.verify(token, secret_key);  //verify token
//     }
//     catch (error) {
//         res.status(401).send({error: "Invalid token, access denied."});  // throw error if token verification fails
//     }
//     try {
//         await mongoose.connect(mongouri);
//     }
//     catch(errorObj) {
//         res.status(500).send({error: errorObj.name});
//     }
//     try {
//         let user = await userModel.findOne({username: decoded.username, tokens: token});
//         if(user) {
//             req.user = user;
//             next();  //executes when successfully authenticated
//         }
//         else {
//             mongoose.connection.close();
//             res.status(401).send({error: "User doesn't exists, access denied."});   //throw error if authentication is unsuccessful
//         }
//     }
//     catch {
//         mongoose.connection.close();
//         res.status(401).send({error: errorObj.name});
//     }
// };

// // app.get('/users', authenticate, (req, res) => {  // the GET users route, uses authenticate middleware to perform user authentication
// //     res.send({firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email});
// // });

// app.post('/api/user/register', async (req, res) => { // the POST signup route
//     try {
//         await mongoose.connect(mongouri);
//     }
//     catch (errorObj) {
//         res.status(500).send({error: errorObj.name});
//     }
//     try {
//         user = new userModel({username: req.body.username,     // create new model with supplied user data
//                                 password: req.body.password,
//                                 isActive: true});
//         await user.save(); // save data to database, if mongoose validation passes
//         mongoose.connection.close();
//         res.send({status: "ok", msg: "User created."});
//     }
//     catch (errorObj) {
//         mongoose.connection.close();
//         res.status(400).send({error: errorObj.message});    // if mongoose validation fails throw error
//     }
// });

// app.post('/api/user/login', async (req, res) => {  // the POST login route, use to login users i.e. generate access tokens
//     try {
//         await mongoose.connect(mongouri);
//     }
//     catch (errorObj) {
//         res.status(500).send({error: errorObj.name});
//     }
//     try {
//         let user = await userModel.findOne({username: req.body.username}); // retrive user data from database
//         if(user && req.body.password) {
//             if(! bcrypt.compareSync(req.body.password, user.password)) {   // check if there is a password match
//                 mongoose.connection.close();
//                 res.status(401).send({error: "Authentication unsuccessful, access denied."}); // if password matching fails throw error
//             }
//             let token = jwt.sign({username: user.username, _id: user._id}, secret_key); //else sign a token
//             user.tokens.push(token); // add token to database
//             try {
//                 let msg = await user.save();
//                 mongoose.connection.close();
//                 res.header('x-auth', token).send({id: msg._id,  usernamew: msg.username});  // send token and user data as response
//             }
//             catch (errorObj) {
//                 mongoose.connection.close();
//                 res.status(400).send({error: errorObj.message});  //if user data is invalid throw error
//             }
//         }
//         else {
//             mongoose.connection.close();
//             res.status(401).send({error: "User doesn't exists or invalid password, access denied."});
//         }
//     }
//     catch (errorObj) {
//         mongoose.connection.close();
//         res.status(400).send({error: errorObj.message});
//     }
// });

// // app.delete('/api/user/logout', authenticate, async (req, res) => { // the DELETE logout route i.e. destroy tokens, logout route should work for only authenticated user, so authenticate middleware is used
// //     try {
// //         await mongoose.connect(mongouri);
// //     }
// //     catch (errorObj) {
// //         res.status(500).send({error: errorObj.name});
// //     }
// //     try {
// //         let data = await userModel.update({_id: req.user._id}, { $pull: {tokens: req.header('x-auth')}}) // delete token from database
// //         if (data.nModified === 1 && data.ok === 1) {
// //             mongoose.connection.close();
// //             res.send({status: "ok", msg: "User logged out."});  // success response if token deletion is successful
// //         }
// //         else {
// //             mongoose.connection.close();
// //             res.status(400).send({error: "Error logging out user."});    // if token deletion is not successful then throw error
// //         }
// //     }
// //     catch {
// //         mongoose.connection.close();
// //         res.status(400).send({error: errorObj.message});
// //     }
// // });
// }