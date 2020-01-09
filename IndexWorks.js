const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/neon-rain`);

app.use(bodyParser.json());
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    hash: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
});
const User = mongoose.model('User', UserSchema);

// //Register New User
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


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  });