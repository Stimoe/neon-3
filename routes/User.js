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

    app.get('/api/user/winCount', async (req, res) => {

        let currentUser = req.query.username


        await User.findOne({ username: currentUser }, 'winCount', function (err, user) {
            res.send(user)
            // newWinCount = user.winCount; 
            // res.send({ message: newWinCount });
        })
    })

    // app.post('/api/user/winCount/', function (req, res) {
    //     var WinCountAndUser = req.body; 
    //     res.send(WinCountAndUser)
    //     var query = { username: req.body.username };
    //     var newWinCount={winCount: req.body.winCount}
    //    User.findOneAndUpdate(query, { winCount: newWinCount }, options, callback)
    // });




    app.patch('/api/user/winCount/', async (req, res) => { 
        var user = req.body.username
        var newWinCount=req.body.winCount
        const newUser = await User.findOneAndUpdate({username: user}, { winCount: newWinCount})
    });
 
    app.patch('/api/user/newDeck', async (req, res) => { 
        var user = req.body.username
        var newDeck=req.body.userDeck
        const updatedDeck = await User.findOneAndUpdate({username: user}, { userDeck: newDeck})
        res.send(updatedDeck)
    })





}


