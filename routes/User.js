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
        } catch(error) {
            return res.status(400).send({
                error: true,
                reason: err.message
            })
        }
    
    });
}

