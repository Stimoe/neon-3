


// var UserModel = require('../models/User3');

// module.exports = (app) => {


// app.post("/api/user/register", async (request, response) => {
//     try {
//         var user = new UserModel(request.body);
//         var result = await user.save();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// app.post("/api/user/login", async (request, response) => {
//     let username = req.body.username;
//        let password = req.body.password;

       

//        UserModel.getUserByUsername(username, function(err, user){
//           if(err) throw err;
//           if(!user){
//             return done(null, false, {message: 'Unknown User'});
//             next()
//         }
    
//         UserModel.comparePassword(password, user.password, function(err, isMatch){
//           if(err) throw err;
//           if(isMatch){
//             return done(null, user);
//           } else {
//             return done(null, false, {message: 'Invalid password'});
//           }
//         });
//        });
     
 

// })
// }
// User.findOne({ username: 'jmar777' }, function(err, user) {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword('Password123', function(err, isMatch) {
//         if (err) throw err;
//         console.log('Password123:', isMatch); // -&gt; Password123: true
//     });

//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -&gt; 123Password: false
//     });




// try {
//     var user = await UserModel.findOne({ username: request.body.username }).exec();
//     if(!user) {
//         return response.status(400).send({ message: "The username does not exist" });
//     }
//     user.comparePassword(request.body.password, (error, match) => {
//         if(!match) {
//             return response.status(400).send({ message: "The password is invalid" });
//         }
//     });
//     response.send({ message: "The username and password combination is correct!" });
// } catch (error) {
//     response.status(500).send(error);
// }
// });