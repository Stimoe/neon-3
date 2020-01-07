var bcrypt = require('bcryptjs');
var User = require('../models/User');
const saltRounds = 10

module.exports = (app) => {

    app.post('/api/user/register', async (req, res) => {
        // Encrypt Password
        try {
            const findUser = await User.findOne({ username: req.body.username }).exec();
            if (findUser !== null) {
                throw new Error('That user already exisits!');
            }
            console.log('Encrypt');
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    console.log('-----password:', hash, '& salt', salt, '-----');
                    passwordHash = hash;
                    saltHash = salt;
                    const user = new User({
                        username: req.body.username,
                        password: passwordHash,
                        hash: saltHash,
                        winCount: 0
                    });
                    console.log(user);
                    user.save();
                    res.send('Registered');
                });
            });
        } catch (err) {
            return res.status(400).send({
                error: true,
                reason: err.message
            })
        }
    });

    // // Login User
    app.post('/api/user/login', async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            // console.log(user);
            if (!user) {
                return res.status(400).send('Incorrect username');
            }
            //Decrypt Password
            const passwordHash = await bcrypt.hash(req.body.password, user.hash);
            if (passwordHash == user.password) {
                // console.log("in")
                res.send('You are logged in!');
            } else {
                console.log('incorrect password');
            }
        } catch (error) {
            return res.status(400).send({
                error: true,
                reason: err.message
            })
        }

    });
    app.get('/api/user/winCount', function (req, res) {
        // req.user should be defined here because of the ensureAuth middleware
        var UserUsername = req.body.username;
      
        User.findOne({username: UserUsername}, function (err, user) {
          if (err) return res.json(400, {message: `user not found.`});
      
          // make sure you omit sensitive user information 
          // on this object before sending it to the client.
          res.json(user);
        });
      });

    // app.get('/api/user/winCount', async (req, res) => {

    //     User.findOne({ username: req.body.username }, function (err, doc) {
    //         // console.log(user);
    //         if (err) throw err;
    //         if (doc)
    //             res.send(doc.winCount)
    //         else
    //             res.send("Not found");

    //     })

    //     res.send(doc.winCount)
    // })










    app.post('/api/user/winCount', async (req, res) => {

        let newWinCount = this.body.winCount
        await User.findOne({ username: req.body.username }, function (err, user) {
            if (err) throw err;

            // change the users location
            user.winCount = newWinCount;

            // save the user
            user.save(function (err) {
                if (err) throw err;

                res.send('User successfully updated!');
            });

        });
    })
}


// User.findById(1, function(err, user) {
//     if (err) throw err;

//     // change the users location
//     user.location = 'uk';

//     // save the user
//     user.save(function(err) {
//       if (err) throw err;

//       console.log('User successfully updated!');
//     });

//   });



//   user.findOneAndUpdate({winCount: newWinCount}
//     , function (err, doc) {
//         if (err) {
//             res.send("update document error");
//         } else {
//            res.send("update document success");
//             res.send(doc);
//         }
//     })
// })

