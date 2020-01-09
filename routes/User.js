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
        })
    })

    app.get('/api/user/currentUser', async (req, res) => {
        let currentUser = req.query.username
        await User.findOne({ username: currentUser }, function (err, user) {
            res.send(user)
        })
    })

    app.patch('/api/user/reset', async (req, res) => { 
        var currentUser = req.body.username
        let newDeck=[]
        let newWinCount=0
        const user = await User.findOne({username: currentUser})
        User.user.userDeck.insert(newDeck, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
             res.send("updated ", user, "with ", docs)
            }
          })
          User.user.winCount.insert(newWinCount, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
             res.send("updated ", user, "with ", docs)
            }
          })
    })






    app.patch('/api/user/winCount/', async (req, res) => { 
        var currentUser = req.body.username
        var newWinCount=req.body.winCount
        
        
        const user = await User.findOne({username: currentUser})
        res.send(user)
        User.user.winCount.insert(newWinCount, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
             res.send(user)
            }
          })
         
    })

 
 
    app.patch('/api/user/newDeck', async (req, res) => { 
        var currentUser = req.body.username
        var newDeck=req.body.userDeck
        // res.send(newDeck)
        const user = await User.findOne({username: currentUser})
        User.user.userDeck.insert(newDeck, function (err, docs) {
                if (err){ 
                    return console.error(err);
                } else {
                 res.send("updated ", user, "with ", docs)
                }
              })
    })





}


