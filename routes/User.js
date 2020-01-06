var bcrypt = require('bcryptjs');
var User = require('../models/User');
const saltRounds = 10

module.exports = (app) => {

    app.post('/api/user/register', function (req, res, next) {
        var newUsername = req.body.username;
        var newPassword = req.body.password;

        var newUser = User({
            username: newUsername,
            password: newPassword,

          });
          
          // save the user
          newUser.save(function(err) {
            if (err) throw err;
          
            console.log('User created!');
          });
        })

    app.post('/api/user/login', (req, res) => {
        //email and password
        const username = req.body.username
        const password = req.body.password
    
        //find user exist or not
        User.findOne({ username })
            .then(user => {
                //if user not exist than return status 400
                if (!user) return res.status(400).json({ msg: "User not exist" })
    
                //if user exist than compare password
                //password comes from the user
                //user.password comes from the database
                bcrypt.compare(password, user.password, (err, data) => {
                    //if error than throw error
                    if (err) throw err
    
                    //if both match than you can do anything
                    if (data) {
                        return res.status(200).json({ msg: "Login success" })
                    } else {
                        return res.status(401).json({ msg: "Invalid credencial" })
                    }
    
                })
    
            })
    
    })
}


// User.getUserByUsername(username, function(err, user){
//     if(err) throw err;
//     if(!user){
//       return done(null, false, {message: 'Unknown User'});
//   }

//   User.comparePassword(password, user.password, function(err, isMatch){
//     if(err) throw err;
//     if(isMatch){
//       return done(null, user);
//     } else {
//       return done(null, false, {message: 'Invalid password'});
//     }
//   });