
var bcrypt = require('bcryptjs');
var User = require('../models/User');


const saltRounds = 10
module.exports = (app) => {

    app.post('/api/user/register', async, function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                throw err
            } else {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        throw err
                    } else {
                        // console.log(hash)
                        var newUser = {
                            username: username,
                            password: hash
                        }

                        var user = new User(newUser);
                        var result = user.save();
                        res.send(result);

                    }
                })
            }
        })

    })

    app.post('/api/user/login', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        let hash = ''
        User.getUserByUsername(username)
            .then(function (user) {
                hash = user.password
                res.send(hash)
            })
        bcrypt.compare(password, hash, function (err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                console.log("Password doesn't match!")
                res.send({ message: "Password doesn't match!" })
            } else {
                console.log("Password matches!")
                res.send({ message: "Password matches!" })
            }
        })

    });

}


// const passwordEnteredByUser = "mypass123"
// const hash = "YOUR_HASH_STRING"

// bcrypt.compare(passwordEnteredByUser, hash, function (err, isMatch) {
//     if (err) {
//         throw err
//     } else if (!isMatch) {
//         console.log("Password doesn't match!")
//     } else {
//         console.log("Password matches!")
//     }
// })





// User.getUserByUsername(username)
//     .then(function (user) {
//         res.send(user)
//         bcrypt.compare(password, hash, function (err, res) {
//             // res === true
//         });
//     })
//     .then(function (samePassword) {
//         if (!samePassword) {
//             res.status(403).send();
//         }
//         res.send();
//     })
//     .catch(function (error) {
//         res.send("Error authenticating user: ");
//         res.send(error);
//         next();
//     });










// const password = "mypass123"
// const saltRounds = 10

// bcrypt.genSalt(saltRounds, function (err, salt) {
//   if (err) {
//     throw err
//   } else {
//     bcrypt.hash(password, salt, function(err, hash) {
//       if (err) {
//         throw err
//       } else {
//         console.log(hash)
//         //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
//       }
//     })
//   }
// })









// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         return User.saveUser(username, hash);
//     })
//     .then(function() {
//         res.send();
//     })
//     .catch(function(error){
//         res.send("Error saving user: ");
//         res.send(error);
//         next();
//     });
// });