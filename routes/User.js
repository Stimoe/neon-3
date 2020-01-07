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

    app.get('/api/user/winCount/user', async (req, res) => {

        let currentUser=req.params.user
        res.send(currentUser)
        // try {
        //     const user = await User.findOne({ username: req.params.user });
        //     // console.log(user);
        //     if (!user) {
        //         return res.status(400).send('Incorrect username');
        //     }
        //     //Decrypt Password
        //     const userWinCount = await (user.winCount);
        //     res.send(JSON.stringify(userWinCount));
        //         // console.log("in")
        //         // res.send('You are logged in!');
         
         
        // } catch (error) {
        //     return res.status(400).send({
        //         error: true,
        //         reason: err.message
        //     })
        // }

   
    })



    // res.send(req.params.user)
    // let checkUserName=req.params.user
    //       User.findOne({ username: checkUserName }, function(e, result){
    //           if (e) return next(e)
    //           res.send(result)
    //         })
       
         

        











    app.post('/api/user/winCount', async (req, res) => {

        let newWinCount = req.body.winCount
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

