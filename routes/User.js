var bcrypt = require('bcryptjs');
var User = require('../models/User');
const saltRounds = 10

module.exports = (app) => {

    app.post('/api/user/register', function (req, res, next) {
        var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

    app.post('/api/user/login', async (req, res) => {
        //email and password
        const username = req.body.username
        const password = req.body.password
    // res.send(username)

    user = await User.findOne({ username: req.body.username })
    

    if (!user) {
        res.send('Could not find user, sorry.');
      }
      else {
        res.send('Found "user"', user.username);
      }


    // .then(user => {
    //     return bcrypt.compare(password, user.password);
    // })
    // .then(function(samePassword) {
    //     if(!samePassword) {
    //         res.status(403).send();
    //     }
    //     res.send();
    // })
    // .catch(function(error){
    //     console.log("Error authenticating user: ");
    //     console.log(error);
    //     next();
    // });
    // })
    
    
  
})
}

// ({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);






// return bcrypt.compare(password, user.password);
// })
// .then(function(samePassword) {
//     if(!samePassword) {
//         res.status(403).send();
//     }
//     res.send();
// })
// .catch(function(error){
//     console.log("Error authenticating user: ");
//     console.log(error);
//     next();
// });