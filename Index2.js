const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const userModel = require('./models/User');
const mongouri = (process.env.MONGODB_URI || `mongodb://localhost:27017/neon-rain`)
const bcrypt = require('bcryptjs');

const app = express();
const secret_key = "thats_really_a_secret";  // enter your secret key here for signing JWT

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const authenticate = (req, res, next) => {  //The authenticate middleware
    let token = req.header('x-auth');
    try {
        decoded = jwt.verify(token, secret_key);  //verify token
        mongoose.connect(mongouri).then(() => {
            userModel.findOne({_id: decoded._id, tokens: token}).then((user) => {  //if token verification is successful then search database with _id and token
                if(user) {
                    req.user = user;
                    next();  //executes when successfully authenticated
                }
                else {
                    mongoose.connection.close();
                    res.status(401).send({error: "User doesn't exists, access denied."});   //throw error if authentication is unsuccessful
                }
            }).catch((errorObj) => {
                mongoose.connection.close();
                res.status(401).send({error: errorObj.name});
            });
        }).catch((errorObj) => {
            res.status(500).send({error: errorObj.name});
        });
    }
    catch (error) {
        mongoose.connection.close();
        res.status(401).send({error: "Invalid token, access denied."});  // throw error if token verification fails
    }
};

// app.get('/users', authenticate, (req, res) => {  // the GET users route, uses authenticate middleware to perform user authentication
//     res.send({id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email});
// });

app.post('/api/user/register', (req, res) => { // the POST signup route
    mongoose.connect(mongouri).then(() => {
        user = new userModel({username: req.body.username,     // create new model with supplied user data
                              password: req.body.password,
                              isActive: true});
        user.save().then((msg) => {   // save data to database, if mongoose validation passes
            mongoose.connection.close();
            res.send({status: "ok", msg: "User created."});
        }).catch((errorObj) => {
            mongoose.connection.close();
            res.status(400).send({error: errorObj.message});    // if mongoose validation fails throw error
        });
    }).catch((errorObj) => {
        res.status(500).send({error: errorObj.name});
    });
});

app.post('/api/user/login', (req, res) => {  // the POST login route, use to login users i.e. generate access tokens
    mongoose.connect(mongouri).then(() => {
        userModel.findOne({username: req.body.username}).then((user) => {  // retrive user data from database
            if(user && req.body.password) {
                if(! bcrypt.compareSync(req.body.password, user.password)) {   // check if there is a password match
                    mongoose.connection.close();
                    res.status(401).send({error: "Authentication unsuccessful, access denied."}); // if password matching fails throw error
                }
                let token = jwt.sign({username: user.username, _id: user._id}, secret_key); //else sign a token
                user.tokens.push(token); // add token to database
                user.save().then((msg) => {
                    mongoose.connection.close();
                    res.header('x-auth', token).send({id: msg._id,  username: msg.username});  // send token and user data as response
                }).catch((errorObj) => {
                    mongoose.connection.close();
                    res.status(400).send({error: errorObj.message});  //if user data is invalid throw error
                });
            }
            else {
                mongoose.connection.close();
                res.status(401).send({error: "User doesn't exists or invalid password, access denied."});
            }
        }).catch((errorObj) => {
            mongoose.connection.close();
            res.status(400).send({error: errorObj.message});
        });
    }).catch((errorObj) => {
        res.status(500).send({error: errorObj.name});
    });
});

app.delete('/logout', authenticate, (req, res) => { // the DELETE logout route i.e. destroy tokens, logout route should work for only authenticated user, so authenticate middleware is used
    mongoose.connect(mongouri).then(() => {
        userModel.update({_id: req.user._id}, { $pull: {tokens: req.header('x-auth')}}).then((data) =>{  // delete token from database
            if (data.nModified === 1 && data.ok === 1) {
                res.send({status: "ok", msg: "User logged out."});  // success response if token deletion is successful
            }
            else {
                mongoose.connection.close();
                res.status(400).send({error: "Error logging out user."});    // if token deletion is not successful then throw error
            }
        }).catch((errorObj) => {
            mongoose.connection.close();
            res.status(400).send({error: errorObj.message});
        });
    }).catch((errorObj) => {
        res.status(500).send({error: errorObj.name});
    });
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